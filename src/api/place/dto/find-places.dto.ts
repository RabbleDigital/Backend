import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindPlacesDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lon: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  distance: number;
}
