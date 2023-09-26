import { Module } from '@nestjs/common';

import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { GoogleModule } from '@shared/google/google.module';
import { BestTimeModule } from '@shared/best-time/best-time.module';
import { PlaceRepositoryModule } from './repository/place.repository.module';

@Module({
  imports: [PlaceRepositoryModule, GoogleModule, BestTimeModule],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
