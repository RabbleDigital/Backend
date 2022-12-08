import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Transform } from 'class-transformer';
import { OpeningHours, Location } from '../../shared/interfaces/place';

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

export type PlaceDocument = HydratedDocument<Place>;

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id;
    },
  },
})
export class Place {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  readonly title: string;

  @Prop({ required: true })
  readonly address: string;

  @Prop(raw(locationRaw))
  readonly location: Location;

  @Prop({ required: true })
  readonly photo: string;

  @Prop({ required: true })
  readonly category: string;

  @Prop({ required: true, index: true })
  readonly placeId: string;

  @Prop(raw(openingHoursRaw))
  readonly openingHours: OpeningHours;
}

export const PlaceModel = SchemaFactory.createForClass(Place);

PlaceModel.index({ location: '2dsphere' });

PlaceModel.loadClass(Place);
