import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/model/Tag';
import { NotionService } from 'src/notion/notion.service';
import { Repository } from 'typeorm';
const notionTagId = 'cIDZ';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private readonly notionService: NotionService,
    private readonly httpService: HttpService,
  ) {}
  async findAll(): Promise<Tag[]> {
    // const tags = await this.httpService.axiosRef.post(
    //   'https://www.notion.so/api/v3/getUserSharedPagesInSpace',
    //   {
    //     spaceId: '448168f8-34d9-4a03-a415-95842a83904b',
    //     auth: process.env.NOTION_API_KEY,
    //   },
    // );
    // console.log('🚀 ~ TagService ~ findAll ~ tags:', tags);

    return this.tagsRepository.find();
  }
  findOne(id: string): Promise<Tag> {
    return this.tagsRepository.findOneBy({ id });
  }

  // 创建新的 tag
  create(tag: Partial<Tag>): Promise<Tag> {
    return this.tagsRepository.save(tag);
  }
  // 删除 tag
  async remove(id: number): Promise<void> {
    await this.tagsRepository.delete(id);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
