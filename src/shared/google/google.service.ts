import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPlaceDetails(place_id: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: { place_id, key: this.configService.get('google.api') },
        })
        .pipe(
          catchError(() => {
            throw new BadRequestException('Something wen`t wrong');
          }),
        ),
    );
    return data;
  }

  async getPlacePhoto({
    photo_reference,
    width,
    height,
  }: Record<string, string | number>) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://maps.googleapis.com/maps/api/place/photo', {
          responseType: 'stream',
          params: {
            photo_reference,
            maxwidth: width,
            maxheight: height,
            key: this.configService.get('google.api'),
          },
        })
        .pipe(
          catchError(() => {
            throw new BadRequestException('Something wen`t wrong');
          }),
        ),
    );

    return data;
  }
}
