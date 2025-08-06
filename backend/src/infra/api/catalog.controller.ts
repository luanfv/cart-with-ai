import { Controller, Get, Param } from '@nestjs/common';
import { CatalogRepository } from '../repository/catalog.repository';

@Controller('/api/catalog')
export class CatalogController {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  @Get('/store/:storeId')
  async getStoreWithProducts(@Param('storeId') storeId: number) {
    const catalog = await this.catalogRepository.findByStoreId(storeId);
    if (!catalog) {
      return { message: 'Store not found or no products available.' };
    }
    return catalog.values;
  }
}
