import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  // @ApiOperation({
  //   tags: ['Notion'],
  //   summary: 'insert page to database',
  //   requestBody: {
  //     content: {
  //       'application/json': {
  //         schema: {
  //           type: 'object',
  //           properties: {
  //             title: {
  //               type: 'string',
  //             },
  //             mdContent: {
  //               type: 'string',
  //             },
  //             publishedAt: {
  //               type: 'string',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
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
