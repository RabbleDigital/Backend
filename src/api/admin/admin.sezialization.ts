import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

class LoginRes {
  @ApiProperty()
  token: string;
}

export function LoginAdmin(): PropertyDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiResponse({
      description: 'Success',
      status: 201,
      type: LoginRes,
    }),
  );
}
