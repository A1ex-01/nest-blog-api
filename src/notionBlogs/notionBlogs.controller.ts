import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotionBlogsService } from './notionBlogs.service';

@ApiTags('notionBlogs')
@Controller('notionBlogs')
export class NotionBlogsController {
  constructor(private readonly notionBlogsService: NotionBlogsService) {}

  @ApiOperation({
    summary: 'get hello',
  })
  @Get('/list')
  findAll() {
    return this.notionBlogsService.getList();
  }
}
