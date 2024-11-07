import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrower } from './entity/borrower.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class BorrowerService {
    constructor(
        @InjectRepository(Borrower)
        private borrowerRepository: Repository<Borrower>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(borrower: Partial<Borrower>, userId: number): Promise<Borrower> {
        try {
            // Get the userId if it exists
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new NotFoundException(`User Does Not Exist`);
        }

        // Add the userId to the borrower alongisde the user information
        const borrowerData = this.borrowerRepository.create({
            ...borrower,
            user,  
          });

        return this.borrowerRepository.save(borrowerData);
        } catch (error) {
            throw new InternalServerErrorException(
                error.message || 'An error occurred while creating the borrower',
            );
        }
        
    }
}
