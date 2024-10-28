import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';

@Controller('tags')
@ApiTags('标签')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOperation({ summary: '获取所有标签' })
  findAll() {
    return this.tagService.findAll();
  }
}
