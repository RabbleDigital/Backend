import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceModel } from './entities/place.model';
import { GoogleModule } from '../shared/google/google.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceModel }]),
    GoogleModule,
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
