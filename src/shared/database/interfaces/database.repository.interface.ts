import {
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
  IDatabaseRawOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseUpdateOptions,
  IDatabaseDeleteOptions,
} from './database.interface';

export interface IDatabaseRepository<T> {
  findAll<Y = T>(
    find?: Record<string, any> | Record<string, any>[],
    options?: IDatabaseFindAllOptions<any>,
  ): Promise<Y[]>;

  findOne<Y = T>(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseFindOneOptions<any>,
  ): Promise<Y>;

  findOneById<Y = T>(
    _id: string,
    options?: IDatabaseFindOneOptions<any>,
  ): Promise<Y>;

  getTotal(
    find?: Record<string, any> | Record<string, any>[],
    options?: IDatabaseOptions<any>,
  ): Promise<number>;

  exists(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseExistOptions<any>,
  ): Promise<boolean>;

  raw<N, R>(rawOperation: R, options?: IDatabaseRawOptions<any>): Promise<N[]>;

  create<N>(data: N, options?: IDatabaseCreateOptions<any>): Promise<T>;

  updateOneById<N>(
    _id: string,
    data: N,
    options?: IDatabaseUpdateOptions<any>,
  ): Promise<T>;

  updateOne<N>(
    find: Record<string, any> | Record<string, any>[],
    data: N,
    options?: IDatabaseUpdateOptions<any>,
  ): Promise<T>;

  deleteOne(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseDeleteOptions<any>,
  ): Promise<T>;

  deleteOneById(_id: string, options?: IDatabaseDeleteOptions<any>): Promise<T>;

  // bulk
  createMany<N>(
    data: N[],
    options?: IDatabaseCreateManyOptions<any>,
  ): Promise<boolean>;

  deleteManyById(
    _id: string[],
    options?: IDatabaseManyOptions<any>,
  ): Promise<boolean>;

  deleteMany(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseManyOptions<any>,
  ): Promise<boolean>;

  updateMany<N>(
    find: Record<string, any> | Record<string, any>[],
    data: N,
    options?: IDatabaseManyOptions<any>,
  ): Promise<boolean>;

  model<N>(): Promise<N>;
}
