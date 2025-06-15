import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotionBlogs } from 'src/model/NotionBlogs';
import { Repository } from 'typeorm';

@Injectable()
export class NotionBlogsService {
  constructor(
    @InjectRepository(NotionBlogs)
    private notionBlogsRepository: Repository<NotionBlogs>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createNotionBlog(data) {
    return this.notionBlogsRepository.save(data);
  }
  async getInfo(page_id: any) {
    console.log('🚀 ~ NotionBlogsService ~ getInfo ~ page_id:', page_id);
    return this.notionBlogsRepository.findOne({
      where: {
        page_id: page_id,
      },
    });
  }
  async updateInfo(page_id: string, data: any) {
    return this.notionBlogsRepository.save({
      ...data,
      page_id,
    });
  }
  async getList() {
    const [data, total] = await this.notionBlogsRepository.findAndCount({
      take: 10,
      skip: 0,
    });
    return {
      list: data,
      total,
    };
  }
}
