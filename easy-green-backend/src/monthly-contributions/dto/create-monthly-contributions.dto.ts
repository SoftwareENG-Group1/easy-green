import { IsNumber, IsDateString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateMonthlyContributionsDto {
    @IsNumber()
    amountPaid: number;

    @IsDateString()
    paymentDate: Date;

    @IsUUID()
    @IsNotEmpty()
    contributionId: string;
}
