import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PlaceDateDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  day: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  hour: number;
}
