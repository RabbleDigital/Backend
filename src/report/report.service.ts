import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReportDto } from './dto/create-report.dto';
import { WEEK_DAYS } from '../shared/config/constants';
import { PaginationService } from '../shared/pagination/services/pagination.service';
import { ReportRepository } from './repository/report.repository';
import { ReportDto } from './dto/report.dto';
import { PlaceService } from '../place/place.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly placeService: PlaceService,
    private readonly paginationService: PaginationService,
  ) {}

  create(createReportDto: CreateReportDto) {
    const currentTime = new Date();
    const day = WEEK_DAYS[currentTime.getDay()];
    const hour = currentTime.getHours();

    return this.reportRepository
      .create({ ...createReportDto, day, hour })
      .then((report) => new ReportDto(report));
  }

  async findAll(page, limit) {
    const skip: number = this.paginationService.skip(page, limit);
    const join = { path: 'place', select: 'title category address photo' };

    const count = await this.reportRepository.getTotal();
    const rows = await this.reportRepository
      .findAll(
        {},
        {
          skip,
          limit,
          join,
        },
      )
      .then((reports) => reports.map((report) => new ReportDto(report)));

    return { count, rows };
  }

  async adjust(id: string) {
    const report = await this.reportRepository.findOneById(id);
    if (!report) throw new NotFoundException({ message: 'Report not Found' });

    const place = await this.placeService.findOneById(report.place.toString());

    const forecast = [...place.forecast];

    forecast[report.day].crowdMeter[report.hour] = report.crowd;

    await this.placeService.updateOneById(report.place.toString(), {
      forecast,
    });

    return;
  }
}
