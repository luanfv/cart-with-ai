import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '@shared/infra/database/entity/store.entity';
import { StoreEntity } from '@cart/domain/store.entity';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async findById(id: string): Promise<StoreEntity | null> {
    if (!id) {
      return null;
    }
    const storeData = await this.repository.findOne({ where: { id } });
    if (!storeData) {
      return null;
    }
    return StoreEntity.restore(storeData.id, storeData.name);
  }
}
