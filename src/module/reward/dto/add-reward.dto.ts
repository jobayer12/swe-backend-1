import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class AddRewardDto {
  @ApiProperty({ example: 'Airline ticket' })
  @MaxLength(255)
  @IsString()
  name: string;

  @ApiProperty({
    example: new Date(new Date().setUTCHours(0, 0, 0, 0)),
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: new Date(
      new Date(new Date().setDate(new Date().getDate() + 7)).setUTCHours(
        23,
        59,
        59,
      ),
    ),
  })
  @IsDateString()
  @Transform((params: TransformFnParams) => {
    if (
      new Date(params.obj.startDate).valueOf() >
      new Date(params.value).valueOf()
    ) {
      throw new HttpException(
        `startDate must be less than ${params.key}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return params.value;
  })
  endDate: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  perDayLimit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  @Transform((params: TransformFnParams) => {
    if (+params.obj.perDayLimit > +params.value) {
      throw new HttpException(
        `perDayLimit must be less than ${params.key}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return params.value;
  })
  totalLimit: number;
}
