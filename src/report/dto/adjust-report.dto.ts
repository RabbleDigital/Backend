import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AdjustReportDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  custom: number;
}
