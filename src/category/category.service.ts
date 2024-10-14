import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/model/Category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categorysRepository: Repository<Category>,
  ) {}
  findAll(): Promise<Category[]> {
    return this.categorysRepository.find();
  }
  findOne(id: string): Promise<Category> {
    return this.categorysRepository.findOneBy({ id });
  }

  // 创建新的 category
  create(category: Partial<Category>): Promise<Category> {
    return this.categorysRepository.save(category);
  }
  // 删除 category
  async remove(id: number): Promise<void> {
    await this.categorysRepository.delete(id);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
