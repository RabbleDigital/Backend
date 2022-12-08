import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './shared/middelwares/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlaceModule } from './place/place.module';
import configuration from './shared/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleModule } from './shared/google/google.module';

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
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
