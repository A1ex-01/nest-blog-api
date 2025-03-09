import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotionBlogs } from 'src/model/NotionBlogs';
import { Tag } from 'src/model/Tag';
import { NotionService } from 'src/notion/notion.service';
import { NotionBlogsModule } from 'src/notionBlogs/notionBlogs.module';
import { NotionBlogsService } from 'src/notionBlogs/notionBlogs.service';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag, NotionBlogs]),
    HttpModule,
    NotionBlogsModule,
  ],
  controllers: [TagController],
  providers: [TagService, NotionService, NotionBlogsService],
})
export class TagModule {}
