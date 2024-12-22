import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('article')
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User, (user) => user.post, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' }) // 指定 Article 表的 id 对应 ArticleDetail 表的 article_id
  userDetail: User;

  // @Column()
  // title: string;

  // @Column()
  // desc: string;
  // @Column()
  // cover: string;

  // @Column()
  // category_id: string;

  // @OneToOne(() => Category, (category) => category.post, { eager: true })
  // @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  // category: Category;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  publishedAt: Date;

  // @OneToOne(() => PostDetail, (PostDetail) => PostDetail.post, { eager: true })
  // @JoinColumn({ name: 'id', referencedColumnName: 'article_id' }) // 指定 Article 表的 id 对应 ArticleDetail 表的 article_id
  // detail: PostDetail; // 查询时通过 detail 返回 ArticleDetail 信息

  // @Column()
  // tag_id: string;

  @Column()
  notion_page_id: string;
}
