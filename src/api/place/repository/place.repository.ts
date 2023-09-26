import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { DatabaseMongoRepositoryAbstract } from '@shared/database/abstracts/database.mongo-repository.abstract';
import { Place } from './place.entity';
import { IDatabaseRepository } from '@shared/database/interfaces/database.repository.interface';
import { DatabaseModel } from '@shared/database/decorators/database.decorator';

@Injectable()
export class PlaceRepository
  extends DatabaseMongoRepositoryAbstract<Place>
  implements IDatabaseRepository<Place>
{
  constructor(
    @DatabaseModel(Place)
    private readonly placeModel: Model<Place>,
  ) {
    super(placeModel);
  }
}
