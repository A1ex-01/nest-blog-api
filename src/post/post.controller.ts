import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/Guard/LoginGuard';
import { Post } from 'src/model/Post';
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

  @ApiOperation({ summary: '更新文章' })
  @Put(':uuid')
  @UseGuards(LoginGuard)
  update(@Param('uuid') uuid: string, @Body() data: Partial<Post>) {
    console.log('🚀 ~ PostController ~ update ~ uuid:', uuid, data);
    return this.postService.update({
      id: uuid,
      notion_page_id: data?.notion_page_id,
    });
  }
}
