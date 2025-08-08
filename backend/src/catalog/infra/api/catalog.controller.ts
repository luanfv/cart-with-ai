import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { CatalogRepository } from '../repository/catalog.repository';

@Controller('/api/catalog')
export class CatalogController {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  @Get('/store/:storeId')
  async getCatalogByStoreId(@Param('storeId') storeId: string) {
    const catalog = await this.catalogRepository.findByStoreId(storeId);
    if (!catalog) {
      throw new NotFoundException('Catalog not found');
    }
    return catalog.values;
  }

  @Get()
  async getCatalogSearchByProductName(@Query('product') productName: string) {
    const catalog = await this.catalogRepository.findByProductName(productName);
    return {
      catalog: catalog.map((item) => item.values),
    };
  }
}
