import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;
  // // 建立与 Article 的反向关系
  // @OneToOne(() => Post, (post) => post.category)
  // post: Post;
}
