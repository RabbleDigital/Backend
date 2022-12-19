import { ApiProperty } from '@nestjs/swagger';

class IError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;
}

export class IBadRequestException extends IError {}

export class IUnauthorizedException extends IError {}
