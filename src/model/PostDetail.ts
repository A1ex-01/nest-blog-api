import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article_detail')
export class PostDetail {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content_md: string;

  @Column()
  article_id: string;
  // // 建立与 Article 的反向关系
  // @OneToOne(() => Post, (post) => post.detail)
  // post: Post;
}
