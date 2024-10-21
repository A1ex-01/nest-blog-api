import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/model/Post';
import { Tag } from 'src/model/Tag';
import { ICP, IPaginationRes } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}
  async findAll(params: ICP): Promise<IPaginationRes<Post>> {
    let [data, total] = await this.postsRepository.findAndCount({
      take: params.pageSize,
      skip: (params.current - 1) * params.pageSize,
    });
    for await (let post of data as any) {
      // 假设 post 有一个 tagIds 字段，表示 tag 的 id 列表
      post.tags = [];
      if (post.tag_id) {
        const tags = JSON.parse(post.tag_id);
        for await (const t of tags) {
          const tag = await this.findTagsByTagId(t);
          // console.log('🚀 ~ PostService ~ forawait ~ tag:', tag);
          post.tags.push(tag);
        }

        // console.log('🚀 ~ PostService ~ forawait ~ tagsDetail:', post.tags);
        // console.log('🚀 ~ PostService ~ forawait ~ post.tag_id:', post.tag_id);
        // 异步查询与该 Post 关联的所有 Tag
        // const tags = await this.tagsRepository.findByIds(post.tagIds);
        // post.tags = tags;  // 把查询到的 Tag 详情赋值给 Post
        // console.log('🚀 ~ PostService ~ forawait ~ post:', tagsDetail);
      } else {
        // post.tags = [];
      }
      console.log('🚀 ~ PostService ~ findAll ~ cloneData:', data);
    }
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
  async findTagsByTagId(tag: string): Promise<Tag> {
    return this.tagsRepository.findOne({
      where: {
        id: tag,
      },
    });
  }
}
