import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/model/Tag';
import { NotionService } from 'src/notion/notion.service';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), HttpModule],
  controllers: [TagController],
  providers: [TagService, NotionService],
})
export class TagModule {}
