import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from './infra/repository/store.repository';
import { Store } from '../shared/infra/database/entity/store.entity';
import { Product } from '../shared/infra/database/entity/product.entity';
import { CatalogRepository } from './infra/repository/catalog.repository';
import { CatalogController } from './infra/api/catalog.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER', 'postgres'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
        database: configService.get<string>('POSTGRES_DB', 'postgres'),
        entities: [
          __dirname + '/../../shared/infra/database/entity/*.entity{.ts,.js}',
        ],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Store, Product]),
  ],
  providers: [
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({
          apiKey: configService.getOrThrow<string>('OPEN_AI_KEY'),
        }),
      inject: [ConfigService],
    },
    StoreRepository,
    CatalogRepository,
  ],
  controllers: [CatalogController],
})
export class CatalogModule {}
