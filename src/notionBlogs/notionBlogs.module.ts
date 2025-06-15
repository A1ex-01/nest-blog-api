import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotionBlogs } from 'src/model/NotionBlogs';
import { NotionBlogsController } from './notionBlogs.controller';
import { NotionBlogsService } from './notionBlogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotionBlogs])],
  controllers: [NotionBlogsController],
  providers: [NotionBlogsService],
})
export class NotionBlogsModule {}
