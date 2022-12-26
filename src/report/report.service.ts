import { Injectable, NotFoundException } from '@nestjs/common';
import { times } from 'lodash';

import { CreateReportDto } from './dto/create-report.dto';
import { WEEK_DAYS } from '../shared/config/constants';
import { PaginationService } from '../shared/pagination/services/pagination.service';
import { ReportRepository } from './repository/report.repository';
import { ReportDto } from './dto/report.dto';
import { PlaceService } from '../place/place.service';
import { ReportStatus } from './repository/report.entity';
import { PlaceDto } from '../place/dto/place.dto';
import { ENUM_PAGINATION_SORT_TYPE } from '../shared/pagination/constants/pagination.enum.constant';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly placeService: PlaceService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createReportDto: CreateReportDto) {
    let status;

    const currentTime = new Date();
    const day = WEEK_DAYS[currentTime.getDay()];
    const hour = currentTime.getHours();

    let place = await this.placeService.findOneById(createReportDto.place);
    if (!place.isHaveCrowd) {
      const forecast = times(7, (index) => ({
        dayInt: index,
        crowdMeter: times(24, () => createReportDto.crowd),
      }));

      place = await this.placeService.updateOneById(place._id.toString(), {
        forecast,
        isHaveCrowd: true,
      });

      status = ReportStatus.AutoAdjusted;
    }

    await this.reportRepository.create({
      ...createReportDto,
      day,
      hour,
      status,
    });

    return new PlaceDto(this.placeService.crowdTransform(place));
  }

  async findAll(status, page, limit) {
    const skip: number = this.paginationService.skip(page, limit);
    const join = { path: 'place', select: 'title category address photo' };

    const count = await this.reportRepository.getTotal({ status });
    const rows = await this.reportRepository
      .findAll(
        { status },
        {
          skip,
          limit,
          join,
          sort: { createdAt: ENUM_PAGINATION_SORT_TYPE.DESC },
        },
      )
      .then((reports) => reports.map((report) => new ReportDto(report)));

    return { count, rows };
  }

  async findById(id) {
    const report = await this.reportRepository.findOneById(id);
    if (!report) throw new NotFoundException({ message: 'Report not Found' });

    return report;
  }

  async adjust(id: string) {
    const report = await this.findById(id);

    const place = await this.placeService.findOneById(report.place.toString());

    const forecast = [...place.forecast];

    forecast[report.day].crowdMeter[report.hour] = report.crowd;

    await this.placeService.updateOneById(report.place.toString(), {
      forecast,
    });

    await this.reportRepository.updateOneById(id, {
      status: ReportStatus.Adjusted,
    });

    return;
  }

  async archive(id: string) {
    const report = await this.findById(id);

    await this.reportRepository.updateOneById(report._id.toString(), {
      status: ReportStatus.Archived,
    });

    return;
  }
}
