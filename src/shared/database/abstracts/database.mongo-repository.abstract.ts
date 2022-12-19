import {
  ClientSession,
  Model,
  PipelineStage,
  PopulateOptions,
  SortOrder,
} from 'mongoose';

import { IDatabaseRepository } from '../interfaces/database.repository.interface';
import {
  IDatabaseCreateManyOptions,
  IDatabaseCreateOptions,
  IDatabaseDeleteOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseManyOptions,
  IDatabaseOptions,
  IDatabaseRawOptions,
  IDatabaseUpdateOptions,
} from '../interfaces/database.interface';
import { ENUM_PAGINATION_SORT_TYPE } from '../../pagination/constants/pagination.enum.constant';
import { IPaginationSort } from '../../pagination/interfaces/pagination.interface';

export abstract class DatabaseMongoRepositoryAbstract<T>
  implements IDatabaseRepository<T>
{
  protected _repository: Model<T>;
  protected _joinOnFind?: PopulateOptions | PopulateOptions[];

  constructor(
    repository: Model<T>,
    options?: PopulateOptions | PopulateOptions[],
  ) {
    this._repository = repository;
    this._joinOnFind = options;
  }

  private _convertSort(sort: IPaginationSort): Record<string, number> {
    const data: Record<string, number> = {};
    Object.keys(sort).forEach((val) => {
      data[val] = sort[val] === ENUM_PAGINATION_SORT_TYPE.ASC ? 1 : -1;
    });

    return data;
  }

  async findAll<Y = T>(
    find?: Record<string, any> | Record<string, any>[],
    options?: IDatabaseFindAllOptions<ClientSession>,
  ): Promise<Y[]> {
    const findAll = this._repository.find(find);

    if (options && options.select) {
      findAll.select(options.select);
    }

    if (options && options.limit !== undefined && options.skip !== undefined) {
      findAll.limit(options.limit).skip(options.skip);
    }

    if (options && options.sort) {
      findAll.sort(
        this._convertSort(options.sort) as { [key: string]: SortOrder },
      );
    }

    if (options && options.join) {
      findAll.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      findAll.session(options.session);
    }

    return findAll.lean();
  }

  async findOne<Y = T>(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseFindOneOptions<ClientSession>,
  ): Promise<Y> {
    const findOne = this._repository.findOne(find);

    if (options && options.select) {
      findOne.select(options.select);
    }

    if (options && options.join) {
      findOne.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      findOne.session(options.session);
    }

    if (options && options.sort) {
      findOne.sort(
        this._convertSort(options.sort) as { [key: string]: SortOrder },
      );
    }

    return findOne.lean();
  }

  async findOneById<Y = T>(
    _id: string,
    options?: IDatabaseFindOneOptions<ClientSession>,
  ): Promise<Y> {
    const findOne = this._repository.findById(_id);

    if (options && options.select) {
      findOne.select(options.select);
    }

    if (options && options.join) {
      findOne.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      findOne.session(options.session);
    }

    if (options && options.sort) {
      findOne.sort(
        this._convertSort(options.sort) as { [key: string]: SortOrder },
      );
    }

    return findOne.lean();
  }

  async getTotal(
    find?: Record<string, any> | Record<string, any>[],
    options?: IDatabaseOptions<ClientSession>,
  ): Promise<number> {
    const count = this._repository.countDocuments(find);

    if (options && options.session) {
      count.session(options.session);
    }

    if (options && options.join) {
      count.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    return count;
  }

  async exists(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseExistOptions<ClientSession>,
  ): Promise<boolean> {
    const exist = this._repository.exists({
      ...find,
      _id: {
        $nin: options && options.excludeId ? options.excludeId : [],
      },
    });

    if (options && options.session) {
      exist.session(options.session);
    }

    if (options && options.join) {
      exist.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    const result = await exist;
    return !!result;
  }

  async raw<N, R = PipelineStage[]>(
    rawOperation: R,
    options?: IDatabaseRawOptions<ClientSession>,
  ): Promise<N[]> {
    if (!Array.isArray(rawOperation)) {
      throw new Error('Must in array');
    }

    const aggregate = this._repository.aggregate<N>(rawOperation);

    if (options && options.session) {
      aggregate.session(options.session);
    }

    return aggregate;
  }

  async create<N>(
    data: N,
    options?: IDatabaseCreateOptions<ClientSession>,
  ): Promise<T> {
    const dataCreate: Record<string, any> = data;
    if (options && options._id) {
      dataCreate._id = options._id;
    }

    const create = await this._repository.create([dataCreate], {
      session: options ? options.session : undefined,
    });

    return create[0];
  }

  async updateOneById<N>(
    _id: string,
    data: N,
    options?: IDatabaseUpdateOptions<ClientSession>,
  ): Promise<T> {
    const update = this._repository.findByIdAndUpdate(
      _id,
      {
        $set: data,
      },
      { new: true },
    );

    if (options && options.join) {
      update.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      update.session(options.session);
    }

    return update;
  }

  async updateOne<N>(
    find: Record<string, any> | Record<string, any>[],
    data: N,
    options?: IDatabaseUpdateOptions<ClientSession>,
  ): Promise<T> {
    const update = this._repository
      .findOneAndUpdate(
        find,
        {
          $set: data,
        },
        { new: true },
      )
      .exists(false);

    if (options && options.join) {
      update.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      update.session(options.session);
    }

    return update;
  }

  async deleteOne(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseDeleteOptions<ClientSession>,
  ): Promise<T> {
    const del = this._repository.findOneAndDelete(find, { new: true });

    if (options && options.join) {
      del.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      del.session(options.session);
    }

    return del;
  }

  async deleteOneById(
    _id: string,
    options?: IDatabaseDeleteOptions<ClientSession>,
  ): Promise<T> {
    const del = this._repository.findByIdAndDelete(_id, {
      new: true,
    });

    if (options && options.join) {
      del.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options && options.session) {
      del.session(options.session);
    }

    return del;
  }

  // bulk
  async createMany<N>(
    data: N[],
    options?: IDatabaseCreateManyOptions<ClientSession>,
  ): Promise<boolean> {
    const create = this._repository.insertMany(data, {
      session: options ? options.session : undefined,
    });

    try {
      await create;
      return true;
    } catch (err: unknown) {
      throw err;
    }
  }

  async deleteManyById(
    _id: string[],
    options?: IDatabaseManyOptions<ClientSession>,
  ): Promise<boolean> {
    const del = this._repository
      .deleteMany({
        _id: {
          $in: _id,
        },
      })
      .exists(false);

    if (options && options.session) {
      del.session(options.session);
    }

    if (options && options.join) {
      del.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    try {
      await del;
      return true;
    } catch (err: unknown) {
      throw err;
    }
  }

  async deleteMany(
    find: Record<string, any> | Record<string, any>[],
    options?: IDatabaseManyOptions<ClientSession>,
  ): Promise<boolean> {
    const del = this._repository.deleteMany(find).exists(false);

    if (options && options.session) {
      del.session(options.session);
    }

    if (options && options.join) {
      del.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    try {
      await del;
      return true;
    } catch (err: unknown) {
      throw err;
    }
  }

  async updateMany<N>(
    find: Record<string, any> | Record<string, any>[],
    data: N,
    options?: IDatabaseManyOptions<ClientSession>,
  ): Promise<boolean> {
    const update = this._repository
      .updateMany(find, {
        $set: data,
      })
      .exists(false);

    if (options && options.session) {
      update.session(options.session as ClientSession);
    }

    if (options && options.join) {
      update.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    try {
      await update;
      return true;
    } catch (err: unknown) {
      throw err;
    }
  }

  async model<N = T>(): Promise<N> {
    return this._repository as N;
  }
}
