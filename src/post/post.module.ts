import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/model/Post';
import { Tag } from 'src/model/Tag';
import { NotionService } from 'src/notion/notion.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag])],
  controllers: [PostController],
  providers: [PostService, NotionService],
})
export class PostModule {}
