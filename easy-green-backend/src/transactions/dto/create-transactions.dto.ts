import { IsString, IsOptional,  IsNotEmpty, IsUUID, IsDecimal, IsEnum, IsDateString } from 'class-validator';
import { TransactionPurpose, TransactionType } from '../entity/transactions.entity';

export class CreateTransactionsDto {
    @IsDecimal()
    @IsNotEmpty()
    amountPaid: number;
    
    @IsEnum(TransactionType)
    @IsNotEmpty()
    type: TransactionType;
  
    @IsEnum(TransactionPurpose)
    @IsNotEmpty()
    purpose: TransactionPurpose;

    @IsDateString()
    @IsOptional()
    transactionDate?: Date;
  
    @IsUUID()
    @IsOptional() // Loan ID is optional if the transaction is for a contribution
    loanId?: string;
  
    @IsUUID()
    @IsOptional() // Contribution ID is optional if the transaction is for a loan
    contributionId?: string;
}