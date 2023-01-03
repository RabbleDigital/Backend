import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReportStatus } from '../repository/report.entity';

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

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ReportStatus)
  status: ReportStatus;
}
