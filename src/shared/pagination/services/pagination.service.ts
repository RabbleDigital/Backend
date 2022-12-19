import { Injectable } from '@nestjs/common';
import { IPaginationService } from '../interfaces/pagination.service.interface';

@Injectable()
export class PaginationService implements IPaginationService {
  skip(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
