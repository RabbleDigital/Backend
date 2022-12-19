import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { PlaceService } from './place.service';
import { FindPlacesDto } from './dto/find-places.dto';
import { FindPlace, FindPlaces } from './place.serialization';

@Controller('places')
@ApiTags('Places')
@ApiSecurity('ApiKey')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  @FindPlaces()
  findAll(@Query() { lat, lon, distance }: FindPlacesDto) {
    return this.placeService.findAll(lat, lon, distance);
  }

  @Get(':id')
  @FindPlace()
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }
}
