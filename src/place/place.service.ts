import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Place, PlaceDocument } from './entities/place.model';
import { Model } from 'mongoose';
import { GoogleService } from '../shared/google/google.service';
import { BestTimeService } from '../shared/best-time/best-time.service';
import {
  GOOGLE_TYPES_MAP,
  METRES_IN_MILE,
  WEEK_DAYS,
} from '../shared/config/constants';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
    private readonly google: GoogleService,
    private readonly bestTime: BestTimeService,
  ) {}

  async findAll(lat, lon, distance) {
    const $maxDistance = +distance * METRES_IN_MILE;

    const places = await this.placeModel.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [+lon, +lat] },
          $maxDistance,
        },
      },
    });

    return places.map((place) => this.crowdTransform(place));
  }

  async findOne(placeId: string) {
    let place: Place = await this.placeModel.findOne({ placeId });
    if (!place) place = await this.findInGoogle(placeId);

    return this.crowdTransform(place);
  }

  private async findInGoogle(placeId) {
    const { result } = await this.google.getPlaceDetails(placeId);

    const { responseUrl } = await this.google.getPlacePhoto(result.photos[0]);

    const transformed = this.transform(result, responseUrl);

    const forecast = await this.getCrowdInfo(transformed);

    return this.placeModel.create({ ...transformed, ...forecast });
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

  private crowdTransform(place) {
    if (!place.isHaveCrowd) return place;

    const currentTime = new Date();
    const currentDay = WEEK_DAYS[currentTime.getDay()];
    const currentHour = currentTime.getHours();

    const currentForecastDay = place.forecast.find(
      (day) => day.dayInt === currentDay,
    );

    return Object.assign(place, {
      crowd: currentForecastDay.crowdMeter[currentHour],
    });
  }

  private transform(place, photo) {
    return {
      title: place.name,
      city: place.address_components.find((e) => e.types.includes('locality'))
        .long_name,
      address: place.formatted_address,
      location: {
        type: 'Point',
        coordinates: [place.geometry.location.lng, place.geometry.location.lat],
      },
      placeId: place.place_id,
      photo,
      openingHours: {
        periods: place.opening_hours.periods,
        text: place.opening_hours.weekday_text,
      },
      category: this.findCategory(place.types),
    };
  }

  private findCategory(types, index = 0) {
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
