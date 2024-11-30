/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateContributionsDto } from './create-contributions.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateContributionsDto extends PartialType(CreateContributionsDto) {

    @ApiProperty({
        description: 'The new agreed monthly amount for the contribution.',
        type: Number,
        required: true,
      })
      newAgreedAmount: number;

}