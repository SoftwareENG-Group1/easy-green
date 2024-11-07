import { IsString, IsEmail, IsNotEmpty, Length, IsEnum } from 'class-validator';
import { UserRole } from '../entity/user.entity';

export class CreateUserDto {
    @IsString()
    @Length(2, 50)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @Length(2, 50)
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @Length(8, 150)
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(10, 15)
    @IsNotEmpty()
    phoneNumber: string;

    @IsEnum(UserRole)
    role?: UserRole;
}