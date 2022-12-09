import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { PlaceService } from './place.service';
import MongooseClassSerializerInterceptor from '../shared/interceptors/mongooseClassSerializer.interceptor';
import { Place } from './entities/place.model';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PlaceVm } from './entities/place-vm.model';

@Controller('places')
@UseInterceptors(MongooseClassSerializerInterceptor(Place))
@ApiTags('Places')
@ApiSecurity('ApiKey')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: PlaceVm,
    isArray: true,
  })
  findAll(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('distance') distance: number,
  ) {
    return this.placeService.findAll(lat, lon, distance);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: PlaceVm,
  })
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }
}
