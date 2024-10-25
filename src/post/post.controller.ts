import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(@Query('current') current = 1, @Query('pageSize') pageSize = 10) {
    return this.postService.findAll({
      current: Number(current),
      pageSize: Number(pageSize),
    });
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.postService.findOne(uuid);
  }
}
