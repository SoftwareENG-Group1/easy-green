/* eslint-disable prettier/prettier */
import { IsString, IsOptional,  IsNotEmpty, IsDecimal, IsPositive, IsDateString } from 'class-validator';

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

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
    
    @IsNotEmpty()
    borrowerId: number;
}