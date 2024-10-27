import { Controller, Get, Param } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('/:dbId')
  findAll(@Param('dbId') dbId: string) {
    return this.notionService.findAll(dbId);
  }
  @Get('/:dbId/:pageId')
  getPageInfo(@Param('dbId') dbId: string, @Param('pageId') pageId: string) {
    console.log('🚀 ~ NotionController ~ getPageInfo ~ pageId:', pageId);
    return this.notionService.getPageInfo(pageId);
  }
}
