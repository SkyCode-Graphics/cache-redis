import { Redis, RedisOptions } from "ioredis";
import type { PrismaClient } from "@prisma/client";

export interface CacheModelOption {
  /**
   * Redis key
   * @default modelName - Use the provided model name
   * @note For pagination the key will be transformed to `$key:$id`
   */
  key: string;

  /**
   * Excluded saved properties.
   * @default empty - don't exclude
   * @note All the properties are getted from prisma, after that, the exclude filter is applied
   */
  exclude: string[];

  /**
   * Redis key
   * @default empty - without filters
   */
  findMany: unknown;

  /**
   * TTL for redis
   * @default 0
   * @note 0 will be infinity
   */
  ttl: number;
}

export class CacheManager {
  redis: Redis;
  prisma: PrismaClient;

  modelOptions: Map<string, CacheModelOption> = new Map();
  ttl: number = 0;

  constructor(prisma: PrismaClient, options: RedisOptions) {
    this.redis = new Redis(options);
    this.prisma = prisma;
  }

  setTTL(ttl: number) {
    this.ttl = ttl;
  }

  connect(): Promise<void> {
    return this.redis.connect();
  }

  /*******************\
   * MODEL CONFIGURE *
  \*******************/

  /**
   * Save model options for future methods.
   * @example
   * ```typescript
   * const cacheManger = new CacheManager(prisma);
   * cacheManger.configureModel("user", {
   *   exclude: ["password"],
   * });
   * const options = cacheManger.getOptions("user");
   * console.log(options); // { key: "user", exclude: ["password"], findMany: {} }
   * ```
   *
   * @param modelName - The name to save options
   */
  configureModel(modelName: string, options: Partial<CacheModelOption>) {
    const opt = Object.assign({
      key: modelName,
      exclude: [],
      findMany: {},
      ttl: this.ttl,
    }, options) as CacheModelOption;
    this.modelOptions.set(modelName, opt);
  }

  getOptions(
    modelName: string,
    options?: Partial<CacheModelOption>,
  ): CacheModelOption {
    const opt = this.modelOptions.get(modelName) ?? {} as CacheModelOption;
    return options ? Object.assign({}, opt, options) as CacheModelOption : opt;
  }

  /***************\
   * REDIS CACHE *
  \***************/

  set(key: string, value: string, ttl: number = this.ttl): Promise<"OK"> {
    if (ttl <= 0) {
      return this.redis.set(key, value);
    } else {
      return this.redis.set(key, value, "EX", ttl);
    }
  }

  forceCache(modelName: string, options?: Partial<CacheModelOption>): unknown {
    const opt = this.getOptions(modelName, options);

    const data = this.prisma[modelName].findMany(opt.findMany) as unknown[];

    if (!data) return null;

    if (opt.exclude.length !== 0) {
      data.forEach((data) => {
        opt.exclude.forEach((key) => {
          delete (data as any)[key];
        });
      });
    }

    const redisData = JSON.stringify(data);

    this.set(opt.key, redisData, opt.ttl);

    return data;
  }
}
