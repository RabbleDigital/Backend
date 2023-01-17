import { Injectable, NotFoundException } from '@nestjs/common';

import { PlaceRepository } from './repository/place.repository';
import { GoogleService } from '../shared/google/google.service';
import { BestTimeService } from '../shared/best-time/best-time.service';
import { Place } from './repository/place.entity';
import {
  GOOGLE_TYPES_MAP,
  METRES_IN_MILE,
  WEEK_DAYS,
} from '../shared/config/constants';
import { PlaceDto } from './dto/place.dto';
import { PlaceDetails } from '../shared/interfaces/google';
import { PlaceDateDto } from './dto/place-date.dto';
import { ListPlacesDto } from './dto/list-places.dto';
import { CursorDto } from './dto/cursor.dto';

@Injectable()
export class PlaceService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly google: GoogleService,
    private readonly bestTime: BestTimeService,
  ) {}

  async findAll(lat, lon, distance, { day, hour }: PlaceDateDto) {
    const $maxDistance = +distance * METRES_IN_MILE;

    const places = await this.placeRepository.findAll({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [+lon, +lat] },
          $maxDistance,
        },
      },
    });

    return places.map(
      (place) => new PlaceDto(this.crowdTransform(place, { day, hour })),
    );
  }

  async list(
    { lat, lon, search }: ListPlacesDto,
    { day, hour }: PlaceDateDto,
    { skip, limit }: CursorDto,
  ) {
    const maxDistance = 6371 * 1000;

    const places = await this.placeRepository.raw([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [+lon, +lat],
          },
          distanceField: 'distance',
          spherical: true,
          maxDistance,
        },
      },
      {
        $match: {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
      },
      { $limit: +limit },
      { $skip: +skip },
    ]);

    return places.map(
      (place) => new PlaceDto(this.crowdTransform(place, { day, hour })),
    );
  }

  async findOne(placeId: string, { day, hour }: PlaceDateDto) {
    let place: Place = await this.placeRepository.findOne({ placeId });
    if (!place) place = await this.findInGoogle(placeId);

    return new PlaceDto(this.crowdTransform(place, { day, hour }));
  }

  async findOneWithUpdate(id, { day, hour }: PlaceDateDto) {
    let place = await this.findOneById(id);

    const currentTime = new Date();

    const diff =
      Math.abs(place.updatedAt.getTime() - currentTime.getTime()) / 3600000;

    if (diff > 3 && place.venueId) {
      const { forecast } = await this.getCrowdInfo(place);
      place = await this.updateOneById(id, { forecast });
    }

    return new PlaceDto(this.crowdTransform(place, { day, hour }));
  }

  async findOneById(id: string) {
    const place = await this.placeRepository.findOneById(id);
    if (!place) throw new NotFoundException({ message: 'Place not Found' });

    return place;
  }

  updateOneById(id: string, body) {
    return this.placeRepository.updateOneById(id, body);
  }

  private async findInGoogle(placeId) {
    const { result }: PlaceDetails = await this.google.getPlaceDetails(placeId);

    const { responseUrl } = await this.google.getPlacePhoto(result.photos[0]);

    const transformed = this.transform(result, responseUrl);

    const forecast = await this.getCrowdInfo(transformed);

    return this.placeRepository.create({ ...transformed, ...forecast });
  }

  private async getCrowdInfo(place) {
    const forecast = await this.bestTime.newForecast(
      place.title,
      place.address,
    );

    if (!forecast)
      return {
        venueId: null,
        isHaveCrowd: false,
        forecast: null,
      };

    return {
      venueId: forecast.venue_id,
      isHaveCrowd: true,
      forecast: forecast.analysis.week_raw.map((day) => ({
        dayInt: day.day_int,
        crowdMeter: this.changeCrowdMeterOrders(
          day.day_raw,
          forecast.window.time_window_start,
        ),
      })),
    };
  }

  crowdTransform(place, { day, hour }: PlaceDateDto) {
    if (!place.isHaveCrowd) return place;

    const currentDay = WEEK_DAYS[day];

    const forecast = new Map();
    place.forecast.map((day) => forecast.set(day.dayInt, day));

    const currentForecastDay = forecast.get(currentDay);

    return Object.assign(place, {
      crowd: currentForecastDay.crowdMeter[hour],
    });
  }

  private transform(place, photo) {
    return {
      title: place.name,
      city: place.address_components.find(
        (e) => e.types.includes('locality') || e.types.includes('postal_town'),
      ).long_name,
      address: place.formatted_address,
      location: {
        type: 'Point',
        coordinates: [place.geometry.location.lng, place.geometry.location.lat],
      },
      placeId: place.place_id,
      utcOffset: place.utc_offset,
      photo,
      openingHours: {
        periods: place?.opening_hours?.periods,
        text: place?.opening_hours?.weekday_text,
      },
      category: this.findCategory(place.types) || 'Other',
    };
  }

  private findCategory(types, index = 0) {
    if (types.length < index + 1) return;

    const category = GOOGLE_TYPES_MAP.get(types[index]);

    if (category) return category;
    else return this.findCategory(types, index + 1);
  }

  private changeCrowdMeterOrders = (array: number[], startTime: number) => {
    const temp = [...array];

    const splice = temp.splice(temp.length - startTime, startTime);
    temp.unshift(...splice);

    return temp;
  };
}
