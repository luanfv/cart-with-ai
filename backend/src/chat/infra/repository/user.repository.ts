import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@shared/infra/database/entity/user.entity';
import { UserEntity } from '@chat/domain/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    if (!id) {
      return null;
    }
    const userData = await this.repository.findOne({ where: { id } });
    if (!userData) {
      return null;
    }
    return UserEntity.restore(userData.id, userData.email, userData.name);
  }
}
