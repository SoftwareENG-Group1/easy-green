import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrower } from './entity/borrower.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateBorrowerDto } from './dto/create-borrower.dto';

@Injectable()
export class BorrowerService {
    constructor(
        @InjectRepository(Borrower)
        private borrowerRepository: Repository<Borrower>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(borrower: CreateBorrowerDto, userId: number): Promise<Borrower> {
        try {
        // Get the userId if it exists
        const user = await this.userRepository.findOne({ where: { userId } });

        if (!user) {
            throw new NotFoundException(`User Does Not Exist`);
        }
        if (user.role !== 'Borrower') {
            throw new NotFoundException(`User is not a borrower`);
        }

        const existingBorrower = await this.borrowerRepository.findOne({ where: { user: { userId } } });
        if (existingBorrower) {
            throw new ConflictException('Borrower already exists for this user');
        }

        // Add the userId to the borrower alongisde the user information
        const borrowerData = this.borrowerRepository.create({
            ...borrower,
            user,  
            city: borrower.address.city,
            state: borrower.address.state,
            street: borrower.address.street,
            country: borrower.address.country,
            postalCode: borrower.address.postalCode,
            nextOfKinFirstName: borrower.nextOfKin.firstName,
            nextOfKinLastName: borrower.nextOfKin.lastName,
            nextOfKinPhoneNumber: borrower.nextOfKin.phoneNumber,
            nextOfKinRelationship: borrower.nextOfKin.relationship,
            nextOfKinStreet: borrower.nextOfKin.houseAddress.street,
            nextOfKinCountry: borrower.nextOfKin.houseAddress.country

          });

        return this.borrowerRepository.save(borrowerData);
        } catch (error) {
            throw new InternalServerErrorException(
                error.message || 'An error occurred while creating the borrower',
            );
        }
        
    }

    async findAll(): Promise<Borrower[]> {
        return this.borrowerRepository.find();
    }
}
