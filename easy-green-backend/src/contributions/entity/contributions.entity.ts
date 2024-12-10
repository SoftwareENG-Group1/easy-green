/* eslint-disable prettier/prettier */
import { Borrower } from "src/borrower/entity/borrower.entity";
import { MonthlyContributions } from "src/monthly-contributions/entity/monthly-contributions.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";


export enum ContributionStatus{
    Active = 'Active',
    Terminated = 'Terminated'
}

@Entity()
export class Contributions {
    @PrimaryGeneratedColumn('uuid')
    contributionsId: string;

    @Column({ length: 100 })
    purpose?: string;

    @Column({ length: 255, nullable: true })
    description?: string;

    @Column('decimal', { precision: 12, scale: 2 })
    totalAmountLeft: number;

    @Column('decimal', { precision: 12, scale: 2 })
    totalAmountPaid: number;

    @Column("decimal", { precision: 12, scale: 2 })
    agreedAmountToSave: number; 
  
    @Column({
        type: 'enum',
        enum: ContributionStatus,
        default: ContributionStatus.Active
    })
    status: ContributionStatus;

    @Column('date', {nullable: true})
    startDate: Date;

    @Column('date', {nullable: true})
    endDate: Date;

    @OneToMany(()=> MonthlyContributions, (monthlyContributions) => monthlyContributions.contributions, {cascade: true})
    monthlyContributions: MonthlyContributions[];

    @Column('decimal', { precision: 12, scale: 2 })
    interestRate: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=> Borrower, (borrower) => borrower.contributions)
    @JoinColumn({name: 'borrowerId'})
    borrower: Borrower; // Relationship with Borrower
}