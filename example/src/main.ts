import { CacheManager } from "cache-redis";
import { PrismaClient } from ".prisma/client";

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const cacheManager = new CacheManager(prisma, { lazyConnect: true });
  await cacheManager.connect();

  console.log("Connected");

  await cacheManager.disconnect();
}

main();
