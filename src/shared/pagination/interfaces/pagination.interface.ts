import { ENUM_PAGINATION_SORT_TYPE } from '../constants/pagination.enum.constant';

export type IPaginationSort = Record<string, ENUM_PAGINATION_SORT_TYPE>;

export interface IPaginationOptions {
  limit: number;
  skip: number;
  sort?: IPaginationSort;
}
