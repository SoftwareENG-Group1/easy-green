import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, IsArray, ValidateNested} from 'class-validator';
import { CreateBorrowerDto, AddressDto, NextOfKinDto } from './create-borrower.dto';
import { Loan } from 'src/loan/entity/loan.entity';

// make all the properties in the CreateBorrowerDto optional
export class UpdateBorrowerDto extends PartialType(CreateBorrowerDto) {
    @ValidateNested()
    @Type(() => AddressDto)
    @IsOptional()
    address?: AddressDto;

    @ValidateNested()
    @Type(() => NextOfKinDto)
    @IsOptional()
    nextOfKin?: NextOfKinDto;

    @IsArray()
    @IsOptional()
    loans?: Loan[];
}
