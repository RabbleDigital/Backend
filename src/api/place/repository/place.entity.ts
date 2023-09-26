import { Prop, raw, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseEntity } from '@shared/database/decorators/database.decorator';
import { DatabaseMongoEntityAbstract } from '@shared/database/abstracts/database.mongo-entity.abstract';
import {
  PlaceLocation,
  PlaceForecast,
  PlaceOpeningHours,
} from '@shared/interfaces/place';

export const PlaceDatabaseName = 'places';

const locationRaw = {
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: [Number],
};

const openingHoursRaw = {
  periods: [
    {
      _id: false,
      open: {
        day: Number,
        time: String,
      },
      close: {
        day: Number,
        time: String,
      },
    },
  ],
  text: [String],
};

const forecastRaw = [
  {
    _id: false,
    dayInt: Number,
    crowdMeter: [Number],
  },
];

@DatabaseEntity({ collection: PlaceDatabaseName })
export class Place extends DatabaseMongoEntityAbstract {
  @Prop({ required: true, type: String })
  readonly title: string;

  @Prop({ required: true, type: String })
  readonly address: string;

  @Prop(raw(locationRaw))
  readonly location: PlaceLocation;

  @Prop({ required: true, type: String })
  readonly photo: string;

  @Prop({ required: true, type: String })
  readonly category: string;

  @Prop({ required: true, index: true, type: String })
  readonly placeId: string;

  @Prop({ required: true, type: Number })
  readonly utcOffset: number;

  @Prop(raw(openingHoursRaw))
  readonly openingHours: PlaceOpeningHours;

  @Prop(raw(forecastRaw))
  readonly forecast: PlaceForecast[];

  @Prop({ type: Number })
  readonly crowd: number;

  readonly distance: number;

  @Prop({ default: false, type: Boolean })
  readonly isHaveCrowd: boolean;

  @Prop({ type: String })
  readonly venueId: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);

PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.loadClass(Place);
