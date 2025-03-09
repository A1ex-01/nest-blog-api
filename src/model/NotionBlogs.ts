import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

export interface BlogCategory {
  id: string;
  name: string;
  color: string;
}

export interface BlogTag {
  id: string;
  name: string;
  color: string;
}

@Entity('notion_blogs')
export class NotionBlogs {
  @PrimaryColumn('varchar', { length: 32 })
  page_id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text', { nullable: true })
  cover_url: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('json', { nullable: true })
  category: BlogCategory;

  @Column('json', { nullable: true })
  tags: BlogTag[];

  // 建立与 Article 的反向关系
  @OneToOne(() => Post, (post) => post.notionDetail)
  post: Post;
}
