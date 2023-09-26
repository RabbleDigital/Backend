import { ApiProperty } from '@nestjs/swagger';
import { PopulatedDoc } from 'mongoose';

import { Report, ReportStatus } from '../repository/report.entity';
import { Place } from '@api/place/repository/place.entity';

class ReportPlace {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  photo: string;
}

export class ReportDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: ReportPlace })
  place: ReportPlace | PopulatedDoc<Place>;

  @ApiProperty()
  crowd: number;

  @ApiProperty()
  day: number;

  @ApiProperty()
  hour: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: ReportStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    _id,
    place,
    crowd,
    day,
    hour,
    description,
    name,
    status,
    createdAt,
    updatedAt,
  }: Report) {
    this.id = _id.toString();
    this.place = place;
    this.crowd = crowd;
    this.day = day;
    this.hour = hour;
    this.description = description;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
