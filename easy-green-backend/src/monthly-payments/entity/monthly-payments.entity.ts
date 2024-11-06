import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Loan } from "src/loan/entity/loan.entity";

@Entity()
export class MonthlyPayment {
    @PrimaryGeneratedColumn('uuid')
    paymentId: string;  

    @ManyToOne(() => Loan, (loan) => loan.monthlyPayments)
    loan: Loan;  

    @Column('decimal', { precision: 12, scale: 2 })
    principal: number // Amortization principle per month

    @Column('decimal', { precision: 12, scale: 2 })
    monthlyInterestRate: number;  // Monthly interest rate

    @Column('decimal', { precision: 12, scale: 2 })
    amountPaid: number;  // Payment amount

    @Column('date')
    paymentDate: Date;  // Date of the payment
}
