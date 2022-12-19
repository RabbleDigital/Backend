import { applyDecorators } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';

import {
  PAGINATION_AVAILABLE_SORT,
  PAGINATION_MAX_PER_PAGE,
  PAGINATION_PAGE,
  PAGINATION_PER_PAGE,
  PAGINATION_SORT,
} from '../constants/pagination.constant';
import { ENUM_PAGINATION_SORT_TYPE } from '../constants/pagination.enum.constant';

export function PaginationPage(page = PAGINATION_PAGE): PropertyDecorator {
  return applyDecorators(
    Expose(),
    Type(() => Number),
    Transform(({ value }) => (!value ? page : value)),
  );
}

export function PaginationLimit(
  perPage = PAGINATION_PER_PAGE,
): PropertyDecorator {
  return applyDecorators(
    Expose(),
    Type(() => Number),
    Transform(({ value }) =>
      !value
        ? perPage
        : value > PAGINATION_MAX_PER_PAGE
        ? PAGINATION_MAX_PER_PAGE
        : value,
    ),
  );
}

export function PaginationSort(
  sort = PAGINATION_SORT,
  availableSort = PAGINATION_AVAILABLE_SORT,
): PropertyDecorator {
  return applyDecorators(
    Expose(),
    Transform(({ value, obj }) => {
      const bSort = PAGINATION_SORT.split('@')[0];

      const rSort = value || sort;
      const rAvailableSort = obj._availableSort || availableSort;
      const field: string = rSort.split('@')[0];
      const type: string = rSort.split('@')[1];
      const convertField: string = rAvailableSort.includes(field)
        ? field
        : bSort;

      const convertType =
        type.toUpperCase() === ENUM_PAGINATION_SORT_TYPE.DESC ? -1 : 1;

      return { [convertField]: convertType };
    }),
  );
}
