import { Controller, Get } from '@nestjs/common';
// import { ClearCache } from 'src/decorators/cache.decorator';

import { ProductService } from './product.service';

@Controller('/test')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
