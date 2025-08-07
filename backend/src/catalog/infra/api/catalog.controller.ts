import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogRepository } from '../repository/catalog.repository';

@Controller('/api/catalog')
export class CatalogController {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  @Get('/store/:storeId')
  async getCatalogByStoreId(@Param('storeId') storeId: number) {
    const catalog = await this.catalogRepository.findByStoreId(storeId);
    if (!catalog) {
      return { message: 'Store not found or no products available.' };
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
