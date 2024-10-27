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
      const response = await this.n2m.pageToMarkdown(pageId);
      // console.log(
      //   `🐛 🐞  Response ➡ ${JSON.stringify(response, null, 2)} 🐞 🐛 `,
      // );
      return {
        content: this.n2m.toMarkdownString(response)?.parent,
      };
    } catch (error: any) {
      console.log(`❗❗ Error  ➡ ${JSON.stringify(error, null, 2)}❗ ❗`);
    }
    return `This action returns all notion`;
  }
}
