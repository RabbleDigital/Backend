import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  validateApiKey(apiKey: string) {
    return this.configService.get<string>('apiKey') === apiKey;
  }

  generateJwt(email) {
    return this.jwtService.signAsync({ email });
  }
}
