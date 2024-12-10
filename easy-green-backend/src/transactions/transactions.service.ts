/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionPurpose, Transactions, TransactionType } from './entity/transactions.entity';
import { Repository } from 'typeorm';
import { Borrower } from 'src/borrower/entity/borrower.entity';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { ContributionsService } from 'src/contributions/contributions.service';
import { MonthlyContributionsService } from 'src/monthly-contributions/monthly-contributions.service';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions)
        private readonly transactionsRepository: Repository<Transactions>,
        @InjectRepository(Borrower)
        private readonly borrowerRepository: Repository<Borrower>,
        private readonly contributionsService: ContributionsService,
        private readonly monthlyContributionsService: MonthlyContributionsService
    ){}


    async createTransaction(createTransactionsDto: CreateTransactionsDto): Promise<Transactions>{
        const { amountPaid, type, purpose, borrowerId, contributionId, loanId, transactionDate} = createTransactionsDto;
        const borrower = await this.borrowerRepository.findOne({where: {borrowerId}})

        if(!borrower){
            throw new NotFoundException('Borrower not found')
        }

        if(type === TransactionType.Debit && purpose === TransactionPurpose.Contribution){
            if(!contributionId){
                throw new BadRequestException('Contribution ID is required for this transaction')
            }

            const contribution = await this.contributionsService.findOneById(contributionId);
            if (!contribution) {
                throw new BadRequestException(`Contribution with ID ${contributionId} not found`);
            }
            const transaction = this.transactionsRepository.create({
                amountPaid,
                type,
                purpose,
                transactionDate: transactionDate|| new Date(),
                borrower,
            });

            const savedTransaction = await this.transactionsRepository.save(transaction);
            await this.monthlyContributionsService.allocatePayment(contributionId, amountPaid);

            return savedTransaction
        }

    }
}
