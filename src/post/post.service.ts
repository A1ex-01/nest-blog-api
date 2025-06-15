import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dto';
import { Post } from 'src/model/Post';
import { Tag } from 'src/model/Tag';
import { NotionService } from 'src/notion/notion.service';
import { ICP, IPaginationRes } from 'src/types';
import { In, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private readonly notionService: NotionService,
  ) {}
  async findAll(params: ICP): Promise<IPaginationRes<Post>> {
    const [data, total] = await this.postsRepository.findAndCount({
      take: params.pageSize,
      skip: (params.current - 1) * params.pageSize,
      order: { publishedAt: 'DESC' },
    });
    return {
      list: data,
      total,
      ...params,
    };
  }
  async findOne(id: string): Promise<any> {
    const data = await this.postsRepository.findOneBy({ notion_page_id: id });
    return {
      ...data,
    };
  }
  findManyByIds(ids: string[]): Promise<Post[]> {
    return this.postsRepository.findBy({ id: In(ids) });
  }

  // 创建新的 post
  async create(post: CreatePostDto): Promise<Post> {
    const p = this.postsRepository.create(post);
    return this.postsRepository.save(p);
  }
  async update(post: Partial<Post>): Promise<UpdateResult> {
    const res = await this.postsRepository.update(post?.id, {
      // notion_page_id: post.notion_page_id,
      ...post,
    });
    return res;
  }
  // 删除 post
  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
  async findTagsByTagId(tag: string): Promise<Tag> {
    return this.tagsRepository.findOne({
      where: {
        id: tag,
      },
    });
  }
}
