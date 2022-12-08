import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleService } from './google.service';

@Module({
  imports: [HttpModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
