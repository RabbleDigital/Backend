import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { FindReportsDto } from './dto/find-reports.dto';
import { AdjustReportDto } from './dto/adjust-report.dto';
import {
  AdjustReport,
  ArchiveReport,
  CreateReport,
  FindReports,
} from './report.serialization';
import { PlaceDateDto } from '../place/dto/place-date.dto';

@Controller('reports')
@ApiTags('Reports')
@ApiSecurity('ApiKey')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @CreateReport()
  create(
    @Body() createReportDto: CreateReportDto,
    @Query() placeDateDto: PlaceDateDto,
  ) {
    return this.reportService.create(createReportDto, placeDateDto);
  }

  @Get()
  @FindReports()
  findAll(@Query() { status, page, limit }: FindReportsDto) {
    return this.reportService.findAll(status, page, limit);
  }

  @Put(':id/adjust')
  @AdjustReport()
  adjust(@Param('id') id: string, @Body() { custom }: AdjustReportDto) {
    return this.reportService.adjust(id, custom);
  }

  @Put(':id/archive')
  @ArchiveReport()
  archive(@Param('id') id: string) {
    return this.reportService.archive(id);
  }
}
