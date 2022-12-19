import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsNotEmpty()
  @IsMongoId()
  place: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  crowd: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
