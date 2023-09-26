import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { times } from 'lodash';

import { CreateReportDto } from './dto/create-report.dto';
import { WEEK_DAYS } from '@shared/config/constants';
import { PaginationService } from '@shared/pagination/services/pagination.service';
import { ReportRepository } from './repository/report.repository';
import { ReportDto } from './dto/report.dto';
import { PlaceService } from '../place/place.service';
import { ReportStatus } from './repository/report.entity';
import { PlaceDto } from '../place/dto/place.dto';
import { ENUM_PAGINATION_SORT_TYPE } from '@shared/pagination/constants/pagination.enum.constant';
import { PlaceDateDto } from '../place/dto/place-date.dto';
import { Place } from '@api/place/repository/place.entity';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly placeService: PlaceService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: CreateReportDto, { day, hour }: PlaceDateDto) {
    await this.checkTodayReport(data);

    let place = await this.placeService.findOneById(data.place);
    if (!place.isHaveCrowd) {
      place = await this.updatePlaceWithInitialForecast(place, data.crowd);
    } else if (data.status === ReportStatus.Update) {
      place = await this.updatePlaceWithUpdatedForecast(
        place,
        day,
        hour,
        data.crowd,
      );
    }

    await this.reportRepository.create({
      ...data,
      hour,
      day: WEEK_DAYS[day],
    });

    return new PlaceDto(this.placeService.crowdTransform(place, { day, hour }));
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

  async adjust(id: string, custom: number) {
    const report = await this.findById(id);

    const place = await this.placeService.findOneById(report.place.toString());

    const forecast = [...place.forecast];

    if (custom) {
      forecast[report.day].crowdMeter[report.hour] = custom;
      await this.reportRepository.updateOneById(id, {
        status: ReportStatus.Adjusted,
        crowd: custom,
      });
    } else {
      forecast[report.day].crowdMeter[report.hour] = report.crowd;
      await this.reportRepository.updateOneById(id, {
        status: ReportStatus.Adjusted,
      });
    }

    await this.placeService.updateOneById(report.place.toString(), {
      forecast,
    });

    return;
  }

  private async checkTodayReport(createReportDto: CreateReportDto) {
    const today = new Date();
    const startDay = new Date(today.setUTCHours(0, 0, 0, 0));

    const exists = await this.reportRepository.exists({
      place: createReportDto.place,
      deviceId: createReportDto.deviceId,
      createdAt: { $gte: startDay },
    });

    if (exists) {
      throw new ForbiddenException('Already sent report today');
    }
  }

  private async updatePlaceWithInitialForecast(place: Place, crowd: number) {
    const forecast = this.generateInitialForecast(crowd);

    place = await this.placeService.updateOneById(place._id.toString(), {
      forecast,
      isHaveCrowd: true,
    });

    return place;
  }

  private generateInitialForecast(crowd: number) {
    return times(7, (index) => ({
      dayInt: index,
      crowdMeter: times(24, () => crowd),
    }));
  }

  private async updatePlaceWithUpdatedForecast(
    place: Place,
    day: number,
    hour: number,
    crowd: number,
  ) {
    const currentDay = WEEK_DAYS[day];
    const forecast = [...place.forecast];
    const currentCrowd = forecast[currentDay].crowdMeter[hour];

    const delta = Math.abs(currentCrowd - crowd);
    const deltaChunk = Math.ceil(delta * 0.25);

    forecast[currentDay].crowdMeter[hour] = currentCrowd + deltaChunk;

    place = await this.placeService.updateOneById(place._id.toString(), {
      forecast,
    });

    return place;
  }
}
