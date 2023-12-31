import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { PlaceService } from './place.service';
import { FindPlacesDto } from './dto/find-places.dto';
import {
  FindPlaceAndCheck,
  FindPlace,
  FindPlaces,
} from './place.serialization';
import { PlaceDateDto } from './dto/place-date.dto';
import { CursorDto } from './dto/cursor.dto';
import { ListPlacesDto } from './dto/list-places.dto';

@Controller('places')
@ApiTags('Places')
@ApiSecurity('ApiKey')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  @FindPlaces()
  findAll(
    @Query() { lat, lon, distance }: FindPlacesDto,
    @Query() placeDateDto: PlaceDateDto,
  ) {
    return this.placeService.findAll(lat, lon, distance, placeDateDto);
  }

  @Get('list')
  @FindPlaces()
  list(
    @Query() listPlacesDto: ListPlacesDto,
    @Query() placeDateDto: PlaceDateDto,
    @Query() cursorDto: CursorDto,
  ) {
    return this.placeService.list(listPlacesDto, placeDateDto, cursorDto);
  }

  @Get(':id')
  @FindPlace()
  findOne(@Param('id') id: string, @Query() placeDateDto: PlaceDateDto) {
    return this.placeService.findOne(id, placeDateDto);
  }

  @Get(':id/check')
  @FindPlaceAndCheck()
  findOneAndCheck(
    @Param('id') id: string,
    @Query() placeDateDto: PlaceDateDto,
  ) {
    return this.placeService.findOneWithUpdate(id, placeDateDto);
  }
}
