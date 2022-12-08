import { AbstractVmModel } from '../../shared/abstract-vm.model';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Additional Classes
 */
class Location {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: number[];
}

class Period {
  @ApiProperty()
  day: number;

  @ApiProperty()
  time: string;
}

class OpeningHoursPeriod {
  @ApiProperty()
  open: Period;

  @ApiProperty()
  close: Period;
}

class OpeningHours {
  @ApiProperty({ isArray: true, type: OpeningHoursPeriod })
  periods: OpeningHoursPeriod[];

  @ApiProperty()
  text: string[];
}

/**
 * Main Class
 */
export class PlaceVm extends AbstractVmModel {
  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly address: string;

  @ApiProperty()
  readonly location: Location;

  @ApiModelProperty()
  readonly photo: string;

  @ApiModelProperty()
  readonly category: string;

  @ApiModelProperty()
  readonly placeId: string;

  @ApiProperty()
  readonly openingHours: OpeningHours;
}
