import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';
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
  async addPageToDatabase(databaseId, { title, mdContent, publishedAt }) {
    try {
      const response = await this.notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          发布日期: {
            date: {
              start: publishedAt,
            },
          },
        },
      });
      console.log('Record added:', response);

      const pageId = response.id;
      const updateRef = await this.updatePageContent(
        databaseId,
        pageId,
        mdContent,
        title,
      );
      console.log(
        '🚀 ~ NotionService ~ addPageToDatabase ~ updateRef:',
        updateRef,
      );
    } catch (error) {
      console.error('Error adding record:', error);
    }
  }
  async updatePageContent(databaseId, pageId, content, title) {
    try {
      const notionBlocks: any = await markdownToBlocks(content);
      const chunkSize = 100;
      let batchCount = 1;

      for (let i = 0; i < notionBlocks.length; i += chunkSize) {
        const batchBlocks = notionBlocks.slice(i, i + chunkSize);

        // 如果是第一批内容则添加到主页面
        if (batchCount === 1) {
          await this.notion.blocks.children.append({
            block_id: pageId,
            children: batchBlocks,
          });
        } else {
          // 创建附加页面用于存储超出部分
          const newPageResponse = await this.notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
              title: {
                title: [
                  {
                    text: {
                      content: `${title}(${batchCount})`,
                    },
                  },
                ],
              },
            },
          });

          const newPageId = newPageResponse.id;

          // 将当前批次内容添加到新页面
          await this.notion.blocks.children.append({
            block_id: newPageId,
            children: batchBlocks,
          });
        }
        batchCount++;
      }
    } catch (error) {
      console.error('Error appending content in batches:', error);
    }
  }
}
