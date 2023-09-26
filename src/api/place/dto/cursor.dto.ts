import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CursorDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  skip: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
