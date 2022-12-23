import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { FindReportsDto } from './dto/find-reports.dto';
import {
  AdjustReport,
  ArchiveReport,
  CreateReport,
  FindReports,
} from './report.serialization';

@Controller('reports')
@ApiTags('Reports')
@ApiSecurity('ApiKey')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @CreateReport()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  @FindReports()
  findAll(@Query() { page, limit }: FindReportsDto) {
    return this.reportService.findAll(page, limit);
  }

  @Put(':id/adjust')
  @AdjustReport()
  adjust(@Param('id') id: string) {
    return this.reportService.adjust(id);
  }

  @Put(':id/archive')
  @ArchiveReport()
  archive(@Param('id') id: string) {
    return this.reportService.archive(id);
  }
}
