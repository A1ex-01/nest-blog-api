import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './model/Category';
import { NotionBlogs } from './model/NotionBlogs';
import { Post } from './model/Post';
import { PostDetail } from './model/PostDetail';
import { Tag } from './model/Tag';
import { User } from './model/User';
import { NotionModule } from './notion/notion.module';
import { NotionBlogsModule } from './notionBlogs/notionBlogs.module';
import { OtherModule } from './other/other.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
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
    entities: [Post, PostDetail, Category, Tag, User, NotionBlogs],
    synchronize: false,
  }),
});
const jwtImporter = JwtModule.register({
  global: true,
  secret: 'a1ex',
  signOptions: { expiresIn: '1d' },
});
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    dbImporter,
    jwtImporter,
    PostModule,
    CategoryModule,
    TagModule,
    UserModule,
    NotionModule,
    OtherModule,
    NotionBlogsModule,
  ],
})
export class AppModule {}
