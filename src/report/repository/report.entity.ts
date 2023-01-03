import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { PopulatedDoc, Schema } from 'mongoose';

import { DatabaseEntity } from '../../shared/database/decorators/database.decorator';
import { DatabaseMongoEntityAbstract } from '../../shared/database/abstracts/database.mongo-entity.abstract';
import { Place } from '../../place/repository/place.entity';

export const ReportDatabaseName = 'reports';

export enum ReportStatus {
  Report = 'report',
  Update = 'update',
  Adjusted = 'adjusted',
}

@DatabaseEntity({ collection: ReportDatabaseName })
export class Report extends DatabaseMongoEntityAbstract {
  @Prop({ type: Schema.Types.ObjectId, ref: Place.name })
  place: PopulatedDoc<Place>;

  @Prop({ required: true, type: Number })
  day: number;

  @Prop({ required: true, type: Number })
  hour: number;

  @Prop({ required: true, type: Number })
  crowd: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String, enum: Object.values(ReportStatus) })
  status: ReportStatus;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

ReportSchema.loadClass(Report);
