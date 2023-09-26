import {
  PaginationLimit,
  PaginationPage,
  PaginationSort,
} from '@shared/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '@shared/pagination/interfaces/pagination.interface';

export class FindReportsDto {
  @PaginationPage(1)
  readonly page: number;

  @PaginationLimit(30)
  readonly limit: number;

  @PaginationSort('createdAt@asc')
  readonly sort: IPaginationSort;
}
