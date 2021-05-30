import { Injectable } from '@nestjs/common';
import { ClearCache } from './clear.cache.decorator';

@Injectable()
export class AppService {

  @ClearCache()
  getHello( param: string ): string {
    return 'Hello World!';
  }
}
