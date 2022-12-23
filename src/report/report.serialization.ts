import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';

import { ReportDto } from './dto/report.dto';
import {
  IBadRequestException,
  IUnauthorizedException,
} from '../shared/interfaces/error';
import { JwtAuthGuard } from '../auth/auth.guard';

class ReportSerialization {
  @ApiProperty()
  count: number;

  @ApiProperty({ isArray: true, type: ReportDto })
  rows: ReportDto[];
}

export function CreateReport(): PropertyDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiResponse({
      description: 'Success',
      status: 201,
      type: ReportDto,
    }),
    ApiResponse({
      description: 'Bad Request',
      status: 400,
      type: IBadRequestException,
    }),
    ApiResponse({
      description: 'Unauthorized Error',
      status: 401,
      type: IUnauthorizedException,
    }),
  );
}

export function FindReports(): PropertyDecorator {
  return applyDecorators(
    ApiResponse({
      description: 'Success',
      status: 200,
      type: ReportSerialization,
    }),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
  );
}

export function AdjustReport(): PropertyDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiResponse({
      description: 'Success',
      status: 204,
    }),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
  );
}

export function ArchiveReport(): PropertyDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiResponse({
      description: 'Success',
      status: 204,
    }),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
  );
}
