import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/model/Post';
import { ICP, IPaginationRes } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  async findAll(params: ICP): Promise<IPaginationRes<Post>> {
    const [data, total] = await this.postsRepository.findAndCount({
      take: params.pageSize,
      skip: (params.current - 1) * params.pageSize,
    });
    return {
      list: data,
      total,
      ...params,
    };
  }
  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  // 创建新的 post
  create(post: Partial<Post>): Promise<Post> {
    return this.postsRepository.save(post);
  }
  // 删除 post
  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
