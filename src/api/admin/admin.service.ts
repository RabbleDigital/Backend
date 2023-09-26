import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoginAdminDto } from './dto/login-admin.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async login(loginAdminDto: LoginAdminDto) {
    const defaultEmail = this.configService.get('admin.email');
    const defaultPassword = this.configService.get('admin.password');

    if (
      loginAdminDto.email !== defaultEmail ||
      loginAdminDto.password !== defaultPassword
    )
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = await this.authService.generateJwt(loginAdminDto.email);

    return { token };
  }
}
