import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // prisma 있으면 여기 안 적어도 됨
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
        PORT: Joi.number().default(3002),
        DATABASE_URL: Joi.string().required()
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',  // 데이터베이스 유형을 PostgreSQL로 설정
      url: process.env.DATABASE_URL,  // 환경 변수에서 DB URL 가져오기
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // 개발 환경에서만 true로 설정
    }),
    GraphQLModule.forRootAsync({
      imports: [],
      inject: [],
      driver: ApolloDriver,
      useFactory: async () => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          subscription: {}
        }
      }
    }),
    DomainModule,
    PokemonModule
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
