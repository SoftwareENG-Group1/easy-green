import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from '../../user/entity/user.entity';
import { Loan } from "src/loan/entity/loan.entity";
import { AddressDto } from "../dto/create-borrower.dto";

export enum EmploymentStatus {
    Employed = 'Employed',
    Unemployed = 'Unemployed',
    SelfEmployed = 'Self Employed',
    Student = 'Student',
    Retired = 'Retired'
}

@Entity()
export class Borrower {
    @PrimaryGeneratedColumn()
    borrowerId: number;

    @OneToOne(() => User, (user) => user.userId)
    @JoinColumn()
    user: User;

    @Column({length:11, type: 'varchar'})
    bvn: string;

    @Column({ type: 'blob', nullable: true })
    NINNumber?: Buffer;

    @Column({ type: 'blob', nullable: true })
    passportPhoto?: Buffer;

    @Column({ type: 'blob', nullable: true })
    driversLicense?: Buffer;

    @Column('json')
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode?: string;
    }

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

    @Column('decimal', { precision: 10, scale: 2 })
    monthlyIncome: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    additionalIncome?: number;

    @Column({ type: 'blob', nullable: true })
    bankStatement?: Buffer;

    @Column({ length: 10 , unique: true})
    accountNumber: string;

    @Column({ length: 50 })
    bankName: string;

    @OneToMany(()=> Loan, (loan)=> loan.loanId)
    @JoinTable()
    loans: Loan[];

}