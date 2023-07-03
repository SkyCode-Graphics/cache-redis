import { Redis, RedisOptions } from "ioredis";
import type { MockPrismaClient } from "@mock/prisma";
import { Prisma } from "@prisma/client";
import { CachePaginator } from "./CachePaginator";

interface RedisError {
  code: string;
  message: string;
  name: string;
  stack: string;
  syscall: string;
  address: string;
  port: number;
  errno: number;
}

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

export class CacheManager<P extends any> {
  readonly redis: Redis;

  readonly modelOptions: Map<string, CacheModelOption> = new Map();
  ttl: number = 0;

  constructor(readonly prisma: P, options: RedisOptions) {
    this.redis = new Redis({ lazyConnect: true, ...options });

    this.redis.on("connecting", this._redis_connecting.bind(this));
    this.redis.on("connected", this._redis_connected.bind(this));
    this.redis.on("error", this._redis_error.bind(this));
  }

  private _redis_connecting() {
    console.log("Connecting to Redis...");
  }

  private _redis_connected() {
    console.log("Connected to Redis");
  }

  private _redis_error(e: RedisError) {
    const err = new Error();
    err.name = "IOredisError";
    if (e.code == "ECONNREFUSED") {
      err.message =
        `Cannot ${e.syscall} to ${e.address}:${e.port}. Make sure it is running or params are correct.`;
    } else {
      err.message = e.message;
    }

    throw err;
  }

  setTTL(ttl: number) {
    this.ttl = ttl;
  }

  connect(): Promise<void> {
    return this.redis.connect();
  }

  disconnect(): Promise<"OK"> {
    return this.redis.quit();
  }

  private get _prisma(): MockPrismaClient {
    return this.prisma as MockPrismaClient;
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

  async forceCache(
    modelName: string,
    options?: Partial<CacheModelOption>,
  ): Promise<unknown> {
    const opt = this.getOptions(modelName, options);

    const data = await this._prisma[modelName as "model"].findMany(
      opt.findMany as {},
    );

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

  paginator<K extends Prisma.ModelName>(key: Lowercase<K>): CachePaginator<K, P> {
    return new CachePaginator(key, this);
  }
}
