import { PopulateOptions } from 'mongoose';

import { IPaginationOptions } from '../../pagination/interfaces/pagination.interface';

// find one
export interface IDatabaseFindOneOptions<T = any>
  extends Pick<IPaginationOptions, 'sort'> {
  select?: Record<string, number | string>;
  join?: boolean | PopulateOptions | PopulateOptions[];
  session?: T;
  withDeleted?: boolean;
}

export type IDatabaseOptions<T = any> = Pick<
  IDatabaseFindOneOptions<T>,
  'session' | 'withDeleted' | 'join'
>;

export type IDatabaseUpdateOptions<T = any> = Pick<
  IDatabaseFindOneOptions<T>,
  'session' | 'join'
>;

export type IDatabaseDeleteOptions<T = any> = IDatabaseUpdateOptions<T>;

// Raw

export type IDatabaseRawOptions<T = any> = Pick<IDatabaseOptions<T>, 'session'>;

// find
export interface IDatabaseFindAllOptions<T = any>
  extends IPaginationOptions,
    Omit<IDatabaseFindOneOptions<T>, 'sort'> {}

// create

export interface IDatabaseCreateOptions<T = any>
  extends Omit<IDatabaseOptions<T>, 'withDeleted' | 'join'> {
  _id?: string;
}

// exist

export interface IDatabaseExistOptions<T = any> extends IDatabaseOptions<T> {
  excludeId?: string[];
}

// bulk
export type IDatabaseManyOptions<T = any> = Pick<
  IDatabaseFindOneOptions<T>,
  'session' | 'join'
>;

export type IDatabaseCreateManyOptions<T = any> = IDatabaseRawOptions<T>;
