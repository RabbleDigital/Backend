import { ApiProperty } from '@nestjs/swagger';

import { Place } from '../repository/place.entity';

class Location {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: number[];
}

class Period {
  @ApiProperty()
  day: number;

  @ApiProperty()
  time: string;
}

class OpeningHoursPeriod {
  @ApiProperty()
  open: Period;

  @ApiProperty()
  close: Period;
}

class OpeningHours {
  @ApiProperty({ isArray: true, type: OpeningHoursPeriod })
  periods: OpeningHoursPeriod[];

  @ApiProperty()
  text: string[];
}

export class PlaceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  utcOffset: number;

  @ApiProperty()
  openingHours: OpeningHours;

  @ApiProperty()
  isHaveCrowd: boolean;

  @ApiProperty()
  crowd: number;

  distance: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    _id,
    title,
    address,
    location,
    photo,
    category,
    utcOffset,
    openingHours,
    isHaveCrowd,
    crowd,
    distance,
    createdAt,
    updatedAt,
  }: Place) {
    this.id = _id.toString();
    this.title = title;
    this.address = address;
    this.location = location;
    this.photo = photo;
    this.category = category;
    this.utcOffset = utcOffset;
    this.openingHours = openingHours;
    this.isHaveCrowd = isHaveCrowd;
    this.crowd = crowd;
    this.distance = distance;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
