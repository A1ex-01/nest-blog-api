export interface ICP {
  current?: number;
  pageSize?: number;
}
export interface IPaginationRes<T> extends ICP {
  list: T[]; // 当前页的数据
  total: number; // 数据总数
}

export interface IFormattedNotionPage {
  pageId: string;
  cover: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
  category: {
    id: string;
    name: string;
    color: string;
  }[];
  content: string;
}
