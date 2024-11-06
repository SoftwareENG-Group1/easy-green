import { Borrower } from "src/borrower/entity/borrower.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { MonthlyPayment } from "src/monthly-payments/entity/monthly-payments.entity";
//import { MonthlyPayment } from "./monthly-payment.entity"; // Assuming the MonthlyPayment entity is in the same folder

export enum LoanStatus {
    Active = 'Active',
    Closed = 'Closed',
    Defaulted = 'Defaulted',
    Pending = 'Pending'
}

@Entity()
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    loanId: string;  

    @Column({ length: 100 })
    purpose: string;  

    @Column({ length: 255, nullable: true })
    description?: string;  

    @Column('decimal', { precision: 12, scale: 2 })
    loanAmount: number;  

    @Column('int')
    amortizationPeriod: number;  // Period (in months) over which the loan is repaid

    @Column('decimal', { precision: 5, scale: 2 })
    interestRate: number; 

    @Column('date')
    startDate: Date;  // Date when the loan is started

    @Column('date')
    endDate: Date;  // Date when the loan is expected to end

    @OneToMany(() => MonthlyPayment, (monthlyPayment) => monthlyPayment.loan)
    monthlyPayments: MonthlyPayment[];  // Relationship with MonthlyPayments

    @Column('decimal', { precision: 12, scale: 2 })
    outstandingBalance: number;  

    @Column({
        type: 'enum',
        enum: LoanStatus,
        default: LoanStatus.Pending,
    })
    status: LoanStatus; 

    @CreateDateColumn()
    createdAt: Date;  

    @UpdateDateColumn()
    updatedAt: Date; 

    @ManyToOne(()=> Borrower, (borrower) => borrower.borrowerId)
    @JoinColumn({name: 'borrowerId'})
    borrowerId: Borrower; // Relationship with Borrower
}
