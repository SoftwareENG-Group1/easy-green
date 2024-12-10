/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { Contributions } from "src/contributions/entity/contributions.entity";
import { Transactions } from "src/transactions/entity/transactions.entity";

export enum MonthlyContributionStatus{
    Paid = 'Paid',
    Defaulted = 'Defaulted',
    Pending = 'Pending'
}


@Entity()
export class MonthlyContributions {
    @PrimaryGeneratedColumn('uuid')
    monthlyContributionsId: string;

    @ManyToOne(() => Contributions, (contributions) => contributions.monthlyContributions)
    contributions: Contributions;

    @Column("decimal", { precision: 12, scale: 2 })
    amountDue: number; 

    @Column('decimal', { precision: 12, scale: 2 })
    amountPaid: number;

    @Column({
        type: 'enum',
        enum: MonthlyContributionStatus,
        default: MonthlyContributionStatus.Pending
    })
    status: MonthlyContributionStatus;

    @OneToMany(()=> Transactions, (transaction) => transaction.monthlyContributions, {cascade: true})
    transactions: Transactions[];

    @Column('date', {nullable: true})
    paymentDate: Date;

    @Column("date")
    dueDate: Date;
}