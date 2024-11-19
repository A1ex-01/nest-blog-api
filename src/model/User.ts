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
}
