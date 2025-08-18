import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from '@cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from '@chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
          __dirname + '/shared/infra/database/entity/*.entity{.ts,.js}',
        ],
      }),
      inject: [ConfigService],
    }),
    CatalogModule,
    CartModule,
    ChatModule,
  ],
})
export class AppModule {}
