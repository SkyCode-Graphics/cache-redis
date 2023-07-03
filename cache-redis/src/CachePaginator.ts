import { MockPrismaClient } from "@mock/prisma";
import { Prisma } from "@prisma/client";
import type { CacheManager } from "./CacheManager";

export class CachePaginator<K extends Prisma.ModelName, P> {
  constructor(
    readonly key: Lowercase<K>,
    private readonly man: CacheManager<P>,
  ) {}

  private get _model(): P[K] {
    return (this.man.prisma as MockPrismaClient)[this.key as "model"];
  }
}
