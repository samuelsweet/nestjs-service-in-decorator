import { Inject } from '@nestjs/common';
import { CacheService } from 'src/modules/product/product.cache.service';
import { CACHE_ENABLE } from 'src/utils/constant';

export const ClearCache = (cache: string) => {
  const injectCacheService = Inject(CacheService);

  return (target: any, _: string, descriptor: PropertyDescriptor) => {
    if (CACHE_ENABLE === 'True') {
      injectCacheService(target, 'service'); // this is the same as using constructor(private readonly logger: LoggerService) in a class

      console.log(this);

      //get original method
      const originalMethod = descriptor.value;

      //redefine descriptor value within own function block
      descriptor.value = async function (...args: any) {
        try {
          console.log(originalMethod);

          const service: CacheService = this.service;
          console.log(args[1]);

          await service.clearCache();

          console.log('apply original method');

          return await originalMethod.apply(this, args);
        } catch (error) {
          console.error(error);
        }
      };
    }
  };
};
