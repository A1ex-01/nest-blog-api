import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
@ApiTags('文章')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '文章列表' })
  @Get()
  @ApiQuery({ name: 'current', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  findAll(@Query('current') current = 1, @Query('pageSize') pageSize = 10) {
    return this.postService.findAll({
      current: Number(current),
      pageSize: Number(pageSize),
    });
  }

  @ApiOperation({ summary: '文章详情' })
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.postService.findOne(uuid);
  }
}
