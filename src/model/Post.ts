import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PostDetail } from './PostDetail';

@Entity('article')
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;
  @Column()
  cover: string;

  @Column()
  category_id: string;
  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
  @OneToOne(() => PostDetail, (PostDetail) => PostDetail.post, { eager: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'article_id' }) // 指定 Article 表的 id 对应 ArticleDetail 表的 article_id
  detail: PostDetail; // 查询时通过 detail 返回 ArticleDetail 信息
}
