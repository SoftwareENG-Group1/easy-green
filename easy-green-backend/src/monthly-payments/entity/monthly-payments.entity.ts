import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Loan } from "src/loan/entity/loan.entity";
import {Transactions } from "src/transactions/entity/transactions.entity";

export enum LoanPaymentStatus {
    Paid = 'Paid',
    Defaulted = 'Defaulted',
    Pending = 'Pending',
}

@Entity()
export class MonthlyPayment {
    @PrimaryGeneratedColumn('uuid')
    paymentId: string;  

    @ManyToOne(() => Loan, (loan) => loan.monthlyPayments)
    loan: Loan;  

    @Column('decimal', { precision: 12, scale: 2 })
    principal: number // Amortization principle per month in dollars

    @Column('decimal', { precision: 12, scale: 2 })
    interest: number;  // Interest per month in dollars

    @Column({
        type: 'enum',
        enum: LoanPaymentStatus,
        default: LoanPaymentStatus.Pending,
    })
    status: LoanPaymentStatus;  // Payment status

    @OneToMany(()=> Transactions, (transactions) => transactions.monthlyPayments, {cascade: true})
    transactions: Transactions[];  // Relationship with Transaction

    @Column('decimal', { precision: 12, scale: 2 })
    monthlyInterestRate: number;  // Monthly interest rate

    @Column('decimal', { precision: 12, scale: 2 })
    amountPaid: number;  // Payment amount

    @Column('date')
    paymentDate: Date;  // Date of the payment
}
