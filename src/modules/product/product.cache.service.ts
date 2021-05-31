import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_ENABLE, KEY_PREFIX } from 'src/utils/constant';

@Injectable()
export class CacheService {
  @Inject(CACHE_MANAGER) public cacheManager: Cache;

  async clearCache(): Promise<void> {
    if (CACHE_ENABLE === 'True') {
      const keys: string[] = await this.cacheManager.store.keys();

      console.log('Clearing Cache');

      keys.forEach((key) => {
        if (key.startsWith(KEY_PREFIX)) {
          this.cacheManager.del(key);
        }
      });
    }
  }
}
