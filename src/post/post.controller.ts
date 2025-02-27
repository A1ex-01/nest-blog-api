import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { nanoid } from 'nanoid';
import { CreatePostDto } from 'src/dto';
import { LoginGuard } from 'src/Guard/LoginGuard';
import { Post as IPost } from '../model/Post';
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
  update(@Param('uuid') uuid: string, @Body() data: Partial<IPost>) {
    return this.postService.update({
      id: uuid,
      ...data,
    });
  }
  @ApiOperation({ summary: '添加文章' })
  @Post('')
  @UseGuards(LoginGuard)
  create(@Body() data: CreatePostDto, @Req() req) {
    return this.postService.create({
      ...data,
      id: nanoid(),
      user_id: req.user.id as string,
    });
  }
}
