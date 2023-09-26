import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ApiModule } from '@api/api.module';
import { AuthMiddleware } from '@common/middlewares/auth.middleware';
import { GoogleModule } from '@shared/google/google.module';
import { LogsMiddleware } from '@common/middlewares/logs.middleware';
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
    GoogleModule,
    ApiModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
