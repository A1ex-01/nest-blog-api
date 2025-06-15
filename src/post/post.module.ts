import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerMiddleware } from 'src/common/middlewares/timer/timer.middleware';
import { NotionBlogs } from 'src/model/NotionBlogs';
import { Post } from 'src/model/Post';
import { Tag } from 'src/model/Tag';
import { NotionService } from 'src/notion/notion.service';
import { NotionBlogsService } from 'src/notionBlogs/notionBlogs.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, NotionBlogs])],
  controllers: [PostController],
  providers: [NotionBlogsService, NotionService, PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
