import { Injectable } from '@nestjs/common';
import { ClearCache } from 'src/decorators/cache.decorator';

@Injectable()
export class ProductService {
  @ClearCache(process.env.CACHE_ENABLE)
  public getHello(): string {
    return 'Hello World!';
  }
}
