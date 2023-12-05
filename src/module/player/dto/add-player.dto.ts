import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AddPlayerDto {
  @ApiProperty({ example: 'john doe' })
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  name: string;
}
