import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Place, PlaceDocument } from './entities/place.model';
import { Model } from 'mongoose';
import { GoogleService } from '../shared/google/google.service';
import { GOOGLE_TYPES_MAP } from '../shared/config/constants';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
    private readonly google: GoogleService,
  ) {}

  findAll() {
    return this.placeModel.find();
  }

  async findOne(placeId: string): Promise<Place> {
    let place = await this.placeModel.findOne({ placeId });
    if (!place) place = await this.findInGoogle(placeId);

    return place;
  }

  private async findInGoogle(placeId) {
    const { result } = await this.google.getPlaceDetails(placeId);

    const { responseUrl } = await this.google.getPlacePhoto(result.photos[0]);

    return this.placeModel.create(this.transform(result, responseUrl));
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
}
