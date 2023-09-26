import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { DatabaseMongoRepositoryAbstract } from '@shared/database/abstracts/database.mongo-repository.abstract';
import { Report } from './report.entity';
import { IDatabaseRepository } from '@shared/database/interfaces/database.repository.interface';
import { DatabaseModel } from '@shared/database/decorators/database.decorator';

@Injectable()
export class ReportRepository
  extends DatabaseMongoRepositoryAbstract<Report>
  implements IDatabaseRepository<Report>
{
  constructor(
    @DatabaseModel(Report)
    private readonly reportModel: Model<Report>,
  ) {
    super(reportModel);
  }
}
