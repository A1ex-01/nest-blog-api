import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/model/Post';
import { Tag } from 'src/model/Tag';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
