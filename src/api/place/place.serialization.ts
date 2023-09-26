import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PlaceDto } from './dto/place.dto';

export function FindPlaces(): PropertyDecorator {
  return applyDecorators(
    ApiResponse({
      description: 'Success',
      status: 200,
      isArray: true,
      type: PlaceDto,
    }),
  );
}

export function FindPlace(): PropertyDecorator {
  return applyDecorators(
    ApiResponse({
      description: 'Success',
      status: 200,
      type: PlaceDto,
    }),
  );
}

export function FindPlaceAndCheck(): PropertyDecorator {
  return applyDecorators(
    ApiResponse({
      description: 'Success',
      status: 200,
      type: PlaceDto,
    }),
  );
}
