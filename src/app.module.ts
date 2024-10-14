import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './model/Post';
import { PostDetail } from './model/PostDetail';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { Category } from './model/Category';
const dbImporter = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('NEST_DB_HOST'),
    port: 3306,
    username: configService.get<string>('NEST_DB_USERNAME'),
    password: configService.get<string>('NEST_DB_PASSWORD'),
    database: configService.get<string>('NEST_DB_NAME'),
    entities: [Post, PostDetail, Category],
    synchronize: false,
  }),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    dbImporter,
    PostModule,
    CategoryModule,
  ],
})
export class AppModule {}
