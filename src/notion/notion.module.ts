import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotionBlogs } from 'src/model/NotionBlogs';
import { NotionBlogsModule } from 'src/notionBlogs/notionBlogs.module';
import { NotionBlogsService } from 'src/notionBlogs/notionBlogs.service';
import { NotionController } from './notion.controller';
import { NotionService } from './notion.service';

@Module({
  imports: [NotionBlogsModule, TypeOrmModule.forFeature([NotionBlogs])],
  controllers: [NotionController],
  providers: [NotionService, NotionBlogsService],
})
export class NotionModule {}
