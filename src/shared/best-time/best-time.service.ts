import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, of } from 'rxjs';

import { NewForecast } from '../interfaces/best-time';

@Injectable()
export class BestTimeService {
  private readonly BEST_TIME_URL: string;
  private readonly BEST_TIME_API_KEY: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.BEST_TIME_URL = this.configService.get('bestTime.url');
    this.BEST_TIME_API_KEY = this.configService.get('bestTime.privateKey');
  }

  async newForecast(venue_name: string, venue_address: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<NewForecast>(
          this.BEST_TIME_URL + '/forecasts/week/raw2',
          {},
          {
            params: {
              venue_name,
              venue_address,
              api_key_private: this.BEST_TIME_API_KEY,
            },
          },
        )
        .pipe(catchError(() => of({ data: undefined }))),
    );

    return data;
  }
}
