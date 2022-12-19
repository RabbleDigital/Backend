export interface IPaginationService {
  skip(page: number, perPage: number): number;
}
