import { ApiProperty } from '@nestjs/swagger';

export class AbstractVmModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
