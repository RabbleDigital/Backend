import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';
import { PlaceModule } from './place/place.module';
import { GoogleModule } from './shared/google/google.module';
import { LogsMiddleware } from './shared/middlewares/logs.middleware';
import { ReportModule } from './report/report.module';
import configuration from './shared/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PlaceModule,
    GoogleModule,
    ReportModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
