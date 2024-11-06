import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEnum, IsNumber, IsArray, IsObject, Length, IsNotEmpty, IsUUID, ValidateNested, IsDecimal } from 'class-validator';
import { EmploymentStatus } from '../entity/borrower.entity';
import { Loan } from 'src/loan/entity/loan.entity';

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsOptional()
    postalCode?: string;
}

export class NextOfKinDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    relationship: string;

    @IsString()
    @IsNotEmpty()
    houseAddress: string;
}

export class CreateBorrowerDto {

    @IsUUID()
    @IsNotEmpty()
    userId: string; // creates the user then get the userId to create the borrower

    @IsString()
    @Length(11, 11)
    @IsOptional()
    NINNumber?: string;

    @IsOptional()
    passportPhoto?: Buffer;

    @IsOptional()
    driversLicense?: Buffer;

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsEnum(EmploymentStatus)
    employmentStatus: EmploymentStatus;

    @ValidateNested()
    @Type(() => NextOfKinDto)
    nextOfKin: NextOfKinDto;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    companyName?: string;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    jobTitle?: string;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    companyAddress?: string;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    occupation?: string;

    @IsDecimal()
    @IsNotEmpty()
    monthlyIncome: number;

    @IsDecimal()
    @IsOptional()
    additionalIncome?: number;

    @IsOptional()
    bankStatement?: Buffer; 

    @IsString()
    @Length(10, 10)
    accountNumber: string;

    @IsString()
    @Length(1, 50)
    bankName: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(()=> Loan)
    loans?: Loan[];
}