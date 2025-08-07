import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../../../shared/infra/database/entity/store.entity';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  getAll(): Promise<Store[]> {
    return this.repository.find();
  }
}
