export abstract class PaginationSimpleListAbstract {
  abstract page?: number;
  abstract limit: number;
  abstract sort?: string;
}
