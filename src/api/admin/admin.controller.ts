import { Controller, Post, Body } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginAdmin } from './admin.sezialization';

@Controller('admins')
@ApiTags('Admins')
@ApiSecurity('ApiKey')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @LoginAdmin()
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }
}
