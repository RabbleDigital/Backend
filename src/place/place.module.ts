import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceModel } from './entities/place.model';
import { GoogleModule } from '../shared/google/google.module';
import { BestTimeModule } from '../shared/best-time/best-time.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceModel }]),
    GoogleModule,
    BestTimeModule,
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
