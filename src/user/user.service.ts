import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @Inject(JwtService)
  private jwtService: JwtService;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async login(user: { username: string; password: string }) {
    const userEntity = await this.usersRepository.findOne({
      where: { username: user.username },
    });
    if (userEntity) {
      // 验证密码
      const { password } = userEntity;
      if (password === user.password) {
        const token = await this.jwtService.signAsync({
          user: {
            id: userEntity.id,
            username: userEntity.username,
          },
        });
        return {
          token,
          user: userEntity,
        };
      } else {
        throw new UnauthorizedException('密码错误');
      }
    } else {
      throw new UnauthorizedException('用户名或密码错误');
    }
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(uuid: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: uuid });
  }
  getInfo(id: string) {
    return this.usersRepository.findOneBy({ id });
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
