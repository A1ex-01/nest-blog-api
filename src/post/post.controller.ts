import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
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
  @Inject()
  private readonly postService: PostService;
  constructor() {}

  @ApiOperation({ summary: '文章列表' })
  @Get()
  @ApiQuery({ name: 'current', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  findAll(
    @Query('current', ParseIntPipe) current = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ) {
    return this.postService.findAll({
      current: current,
      pageSize: pageSize,
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
    return this.postService.update({
      id: uuid,
      ...data,
    });
  }
}
