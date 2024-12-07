/* eslint-disable prettier/prettier */
import { IsString, IsOptional,  IsNotEmpty, IsUUID, IsDecimal, IsPositive, IsDateString } from 'class-validator';

export class CreateContributionsDto {
    @IsString()
    @IsOptional()
    purpose?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDecimal()
    @IsPositive()
    agreedAmountToSave: number;

    @IsDecimal()
    totalAmount: number;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsDecimal()
    interestRate: number;

    @IsUUID()
    @IsNotEmpty()
    borrowerId: number;
}