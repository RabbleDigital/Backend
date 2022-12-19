import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export abstract class DatabaseMongoEntityAbstract {
  _id: ObjectId;

  @Prop({
    required: false,
    index: true,
    type: Date,
  })
  createdAt: Date;

  @Prop({
    required: false,
    index: true,
    type: Date,
  })
  updatedAt: Date;
}
