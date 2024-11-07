import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsDate} from 'class-validator';
import { CreateLoanDto } from './create-loan.dto';


export class UpdateLoanDto extends PartialType(CreateLoanDto) {
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    principal?: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    monthlyInterestRate?: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    amountPaid?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    paymentDate?: Date;
}
