import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './model/Post';
import { PostDetail } from './model/PostDetail';
const dbImporter = TypeOrmModule.forRoot({
  type: 'mysql',
  host: '106.54.215.126',
  port: 3306,
  username: 'root',
  password: 'Vae20.30Peter',
  database: 'blog',
  entities: [Post, PostDetail],
  synchronize: false,
});
@Module({
  imports: [dbImporter, PostModule],
  // controllers: [PostController],
  // providers: [PostService],
})
export class AppModule {}
