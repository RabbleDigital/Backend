import { Module } from '@nestjs/common';

import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PaginationModule } from '@shared/pagination/pagination.module';
import { ReportRepositoryModule } from './repository/report.repository.module';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [ReportRepositoryModule, PlaceModule, PaginationModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
