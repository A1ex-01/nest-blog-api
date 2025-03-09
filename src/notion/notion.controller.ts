import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotionService } from './notion.service';
@ApiTags('Notion')
@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}
  @ApiOperation({
    summary: 'Get all pages in a database',
  })
  @Get('/:dbId')
  findAll(@Param('dbId') dbId: string) {
    return this.notionService.findAll(dbId);
  }
  @ApiOperation({
    summary: 'Get page info',
  })
  @Get('/:dbId/:pageId')
  getPageInfo(@Param('dbId') dbId: string, @Param('pageId') pageId: string) {
    return this.notionService.getPageInfo(pageId);
  }
  @ApiOperation({
    summary: 'insert page to database',
  })
  @ApiOperation({
    summary: 'sync blog',
  })
  @Post('/syncBlogs')
  syncBlog() {
    return this.notionService.syncBlogs();
  }
  @Post('/:dbId')
  insetPageInDb(
    @Param('dbId') dbId: string,
    @Body()
    data: {
      title: string;
      mdContent: string;
      publishedAt: string;
    },
  ) {
    console.log(data);
    return this.notionService.addPageToDatabase(dbId, data);
  }
}
