import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ListPlacesDto {
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
  @Type(() => String)
  @IsString()
  search: string;
}
