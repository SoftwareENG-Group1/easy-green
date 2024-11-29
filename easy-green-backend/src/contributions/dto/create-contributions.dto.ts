import { IsString, IsOptional,  IsNotEmpty, IsUUID, IsDecimal } from 'class-validator';

export class CreateContributionsDto {
    @IsString()
    @IsOptional()
    purpose?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDecimal()
    totalAmount: number;

    @IsString()
    startDate: Date;

    @IsString()
    endDate: Date;

    @IsDecimal()
    interestRate: number;

    @IsUUID()
    @IsNotEmpty()
    borrowerId: string;
}