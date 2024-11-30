/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthlyContributions, MonthlyContributionStatus } from 'src/monthly-contributions/entity/monthly-contributions.entity';
import { Repository } from 'typeorm';
import { CreateContributionsDto } from './dto/create-contributions.dto';
import { Contributions, ContributionStatus } from './entity/contributions.entity';
import { Borrower } from 'src/borrower/entity/borrower.entity';


@Injectable()
export class ContributionsService {
    constructor(
        @InjectRepository(Contributions)
        private readonly contributionsRepository: Repository<Contributions>,
        @InjectRepository(MonthlyContributions)
        private readonly monthlyContributionsRepository: Repository<MonthlyContributions>,
        @InjectRepository(Borrower)
        private readonly borrowerRepository: Repository<Borrower>,
    ){}

    async createContributions(createContributionsDto: CreateContributionsDto): Promise<Contributions>{
        const borrower = await this.borrowerRepository.findOne({ where: { borrowerId: createContributionsDto.borrowerId } });

        if (!borrower) {
          throw new NotFoundException('Borrower not found');
        }
        
        const contribution = this.contributionsRepository.create(createContributionsDto);

        contribution.totalAmount = 0; 
        contribution.status = ContributionStatus.Active; 
        contribution.startDate = new Date(createContributionsDto.startDate); 
        contribution.interestRate = createContributionsDto.interestRate; 
        contribution.agreedMonthlyAmount = createContributionsDto.agreedMonthlyAmount; 
        const savedContribution = await this.contributionsRepository.save(contribution);

        const monthlyContribution = new MonthlyContributions();
        monthlyContribution.contributions = savedContribution;
        monthlyContribution.amountPaid = 0;
        monthlyContribution.status = MonthlyContributionStatus.Pending;
        monthlyContribution.paymentDate = new Date(createContributionsDto.startDate);

    
        await this.monthlyContributionsRepository.save(monthlyContribution);

        return savedContribution;
        }

        async adjustMonthlyContribution(contributionId: string, newAgreedAmount: number): Promise<Contributions> {
            const contribution = await this.contributionsRepository.findOne({ where: { contributionsId: contributionId } });
        
            if (!contribution) {
              throw new Error('Contribution not found');
            }
        
    
            contribution.agreedMonthlyAmount = newAgreedAmount;
        
            await this.contributionsRepository.save(contribution);
        
            return contribution;
          }
          async findOneById(contributionsId: string): Promise<Contributions> {
            const contribution = await this.contributionsRepository.findOne({
              where: { contributionsId },
              relations: ['borrower', 'monthlyContributions'], 
            });
          
            if (!contribution) {
              throw new NotFoundException('Contribution not found');
            }
          
            return contribution;
          }
          async findByBorrowerId(borrowerId: number): Promise<Contributions[]> {
            const borrower = await this.borrowerRepository.findOne({ where: { borrowerId } });
          
            if (!borrower) {
              throw new NotFoundException('Borrower not found');
            }
          
            
            const contributions = await this.contributionsRepository.find({
              where: { borrower },
              relations: ['monthlyContributions'], 
            });
          
            return contributions;
          }
          async findAll(): Promise<Contributions[]> {
            const contributions = await this.contributionsRepository.find({
              relations: ['borrower', 'monthlyContributions'], 
            });
          
            return contributions;
          }
}
