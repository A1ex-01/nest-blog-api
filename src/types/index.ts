export interface ICP {
  current?: number;
  pageSize?: number;
}
export interface IPaginationRes<T> extends ICP {
  list: T[]; // 当前页的数据
  total: number; // 数据总数
}
