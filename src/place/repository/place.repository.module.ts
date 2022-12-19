import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlaceRepository } from './place.repository';
import { Place, PlaceSchema } from './place.entity';

@Module({
  providers: [PlaceRepository],
  exports: [PlaceRepository],
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
})
export class PlaceRepositoryModule {}
