import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { INotionBlog } from 'src/types/notion';

@Injectable()
export class NotionService {
  notion: Client;
  envConfig: any;
  n2m: NotionToMarkdown;
  constructor() {
    // this.envConfig = ConfigService.get
  }
  onModuleInit() {
    this.notion = new Client({
      // auth: this.envConfig.NOTION_API_KEY,
      auth: process.env.NOTION_API_KEY,
    });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
  }
  async findAll(dbId: string): Promise<INotionBlog[] | string> {
    console.log('🚀 ~ NotionService ~ findAll ~ dbId:', dbId);
    try {
      const response = await this.notion.databases.query({
        database_id: dbId,
      });
      const data = response;
      // console.log(
      //   `🐛 🐞  Response ➡ ${JSON.stringify(response, null, 2)} 🐞 🐛 `,
      // );
      return data.results as INotionBlog[];
    } catch (error: any) {
      console.log(`❗❗ Error  ➡ ${JSON.stringify(error, null, 2)}❗ ❗`);
    }
    return `This action returns all notion`;
  }
  async getPageInfo(pageId: string) {
    try {
      const detail: any = await this.notion.pages.retrieve({
        page_id: pageId,
      });
      const title = detail?.properties?.['名称'].title[0].plain_text;
      const createdAt = detail?.properties?.['创建时间'].created_time;
      const updatedAt = detail?.properties?.['更新时间'].last_edited_time;
      const tags = detail?.properties?.['标签'].multi_select;
      const category = detail?.properties?.['分类'].select;
      const cover = detail?.cover?.external?.url;
      const response = await this.n2m.pageToMarkdown(pageId);
      return {
        pageId,
        cover,
        title,
        createdAt,
        updatedAt,
        tags,
        category,
        content: this.n2m.toMarkdownString(response)?.parent,
      };
    } catch (error: any) {
      console.log(`❗❗ Error  ➡ ${JSON.stringify(error, null, 2)}❗ ❗`);
    }
    return {};
  }
}
