import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportRepository } from './report.repository';
import { Report, ReportSchema } from './report.entity';

@Module({
  providers: [ReportRepository],
  exports: [ReportRepository],
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
  ],
})
export class ReportRepositoryModule {}
