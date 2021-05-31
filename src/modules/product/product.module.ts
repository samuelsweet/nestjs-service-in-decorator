import { CacheModule, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './product.cache.service';
import dotenv = require('dotenv');
import { CACHE_ENABLE } from 'src/utils/constant';

const { parsed } = dotenv.config({
  path: `${process.cwd()}/.env`,
});
process.env = { ...parsed, ...process.env };

const providers: any = [ProductService];

const modules = [];
const cacheModule = CacheModule.register({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  ttl: 43200, // 12 Hours
});

if (CACHE_ENABLE == 'True') {
  modules.push(cacheModule);
  providers.push(CacheService);
}

@Module({
  imports: modules,
  controllers: [ProductController],
  providers: providers,
})
export class ProductModule {}
