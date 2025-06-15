import { omit } from 'lodash';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;
  @Column()
  nickname: string;
  @Column()
  email: string;
  @Column()
  age: string;
  @Column()
  mobile: string;
  @Column()
  birthday: Date;
  @Column()
  desc: string;
  @Column()
  avatar: string;

  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @Column()
  password: string;
  // 建立与 Article 的反向关系
  @OneToOne(() => Post, (post) => post.userDetail)
  post: Post;

  // 可选：重写 toJSON 方法
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = this;
    // 序列化隐藏 password
    return omit(rest, 'desc');
  }
}
