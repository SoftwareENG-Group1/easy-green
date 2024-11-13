import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsDate, ValidateNested, IsArray, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { LoanStatus } from '../entity/loan.entity';
import { MonthlyPayment } from 'src/monthly-payments/entity/monthly-payments.entity';

export class CreateLoanDto {

    @IsString()
    @IsNotEmpty()
    purpose: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    loanAmount: number;

    @IsNumber()
    @IsNotEmpty()
    amortizationPeriod: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    interestRate: number;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    endDate: Date;

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => MonthlyPayment)
    // monthlyPayments?: MonthlyPayment[];

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    outstandingBalance: number;

    @IsEnum(LoanStatus)
    @IsNotEmpty()
    status: LoanStatus;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    updatedAt?: Date;

    @IsUUID()
    @IsNotEmpty()
    borrowerId: string; // when creating a loan the borrowerId must be passed
}
