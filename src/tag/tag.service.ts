import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/model/Tag';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}
  findAll(): Promise<Tag[]> {
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
