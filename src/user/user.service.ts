import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(uuid: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: uuid });
  }

  // 创建新的 user
  create(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }
  // 删除 user
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
