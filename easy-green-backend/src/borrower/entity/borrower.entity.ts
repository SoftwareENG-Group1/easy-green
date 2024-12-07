import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from '../../user/entity/user.entity';
import { Loan } from "src/loan/entity/loan.entity";
import { AddressDto } from "../dto/create-borrower.dto";
import { Contributions } from "src/contributions/entity/contributions.entity";
import { Transactions } from "src/transactions/entity/transactions.entity";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export enum EmploymentStatus {
    Employed = 'Employed',
    Unemployed = 'Unemployed',
    SelfEmployed = 'Self Employed',
    Student = 'Student',
    Retired = 'Retired',
}


@Entity()
export class Borrower {
    @PrimaryGeneratedColumn()
    borrowerId: number;

    @OneToOne(() => User, (user) => user.userId)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ length: 11, type: 'varchar' })
    bvn: string;

    @Column({ type: 'blob', nullable: true })
    NINNumber?: Buffer;

    @Column({ type: 'blob', nullable: true })
    passportPhoto?: Buffer;

    @Column({ type: 'blob', nullable: true })
    driversLicense?: Buffer;

    @Column('json')
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @Column({
        type: 'enum',
        enum: EmploymentStatus,
        default: EmploymentStatus.Employed,
    })
    employmentStatus: EmploymentStatus;

    @Column('json')
    nextOfKin: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        relationship: string;
        houseAddress: AddressDto;
    }

    @Column({ length: 50, nullable: true })
    companyName?: string;

    @Column({ length: 50, nullable: true })
    jobTitle?: string;

    @Column({ length: 50, nullable: true })
    companyAddress?: string;

    @Column({ length: 50, nullable: true })
    occupation?: string;

    @Column({ length: 10, unique: true })
    accountNumber: string;

    @Column('decimal', { precision: 12, scale: 2 })
    monthlyIncome: number;

    @Column({ length: 50 })
    bankName: string;

    @OneToMany(() => Transactions, (transactions) => transactions.borrower)
    transactions: Transactions[];

    @OneToMany(() => Loan, (loan) => loan.borrowerId, { cascade: true })
    loans?: Loan[];

    @OneToMany(() => Contributions, (contributions) => contributions.borrower, { cascade: true })
    contributions?: Contributions[];

}