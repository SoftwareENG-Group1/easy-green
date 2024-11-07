import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";

export enum UserRole {
    Admin = "Admin",
    Borrower = "Borrower"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 50 })
    @Length(2, 50)
    firstName: string;

    @Column({ length: 50 })
    @Length(2, 50)
    lastName: string;

    @Column()
    @Length(8, 150)
    password: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ unique: true, length: 15 })
    @Length(10, 15)
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Borrower,
    })
    role: "Admin" | "Borrower";

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
