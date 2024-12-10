import { IsUUID, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMonthlyPaymentsDto {
    @IsUUID()
    paymentId?: string;

    @IsUUID()
    @IsNotEmpty()
    loanId: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    amountPaid: number;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    paymentDate: Date;
}
