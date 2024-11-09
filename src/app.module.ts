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
    DomainModule
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
