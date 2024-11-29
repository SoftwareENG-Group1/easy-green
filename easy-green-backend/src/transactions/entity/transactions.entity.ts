import { Contributions } from "src/contributions/entity/contributions.entity";
import { Loan } from "src/loan/entity/loan.entity";
import { MonthlyContributions } from "src/monthly-contributions/entity/monthly-contributions.entity";
import { MonthlyPayment } from "src/monthly-payments/entity/monthly-payments.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

export enum TransactionType{
    Credit = 'Credit',
    Debit = 'Debit'
}

export enum TransactionPurpose {
    Loan = 'Loan',
    Contribution = 'Contribution'
}

@Entity()
export class Transactions{
    @PrimaryGeneratedColumn('uuid')
    transactionId: string;

    @Column('decimal', { precision: 12, scale: 2 })
    amountPaid: number;

    @Column({
        type: 'enum',
        enum: TransactionType,
    })
    type: TransactionType;

    @Column({
        type: 'enum',
        enum: TransactionPurpose,
    })
    purpose: TransactionPurpose;

    @Column('date')
    transactionDate: Date;

    @ManyToOne(()=> MonthlyPayment, (monthlyPayments) => monthlyPayments.transactions, {nullable: true})
    monthlyPayments?: MonthlyPayment;

    @ManyToOne(()=> MonthlyContributions, (contributions) => contributions.transactions, {nullable: true})
    monthlyContributions?: MonthlyContributions;

}