import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategies/apiKey.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminStrategy } from './strategies/admin.strategy';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, ApiKeyStrategy, AdminStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
