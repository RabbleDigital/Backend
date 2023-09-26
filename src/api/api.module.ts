import { Module } from '@nestjs/common';
import { AdminModule } from '@api/admin/admin.module';
import { AuthModule } from '@api/auth/auth.module';
import { PlaceModule } from '@api/place/place.module';
import { ReportModule } from '@api/report/report.module';

@Module({
  imports: [AdminModule, AuthModule, PlaceModule, ReportModule],
})
export class ApiModule {}
