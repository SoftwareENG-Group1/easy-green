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

        contribution.totalAmountPaid = 0; 
        contribution.status = ContributionStatus.Active; 
        contribution.startDate = new Date(createContributionsDto.startDate); 
        contribution.endDate = new Date(createContributionsDto.endDate);
        contribution.interestRate = 5; 
        contribution.agreedAmountToSave = createContributionsDto.agreedAmountToSave; 
        contribution.totalAmountLeft = createContributionsDto.agreedAmountToSave
        contribution.borrower = borrower

        const months = this.calculateMonths(createContributionsDto.startDate, createContributionsDto.endDate) ;
        const monthlyContributions = this.generateMonthlyContributions(createContributionsDto, months);
        monthlyContributions.forEach((monthlyContribution) => {
          monthlyContribution.contributions = contribution;
        })

        await this.monthlyContributionsRepository.save(monthlyContributions);

        contribution.monthlyContributions = monthlyContributions
        const savedContribution = await this.contributionsRepository.save(contribution);
        return savedContribution;
        }

        private calculateMonths(startDate: string, endDate: string): number{
          const start = new Date(startDate);
          const end = new Date(endDate);
          return (end.getFullYear() - start.getFullYear())*12 + (end.getMonth()  - start.getMonth()) + 1;
        }

        private generateMonthlyContributions(dto: CreateContributionsDto, months:number): MonthlyContributions[]{
          const monthlyAmount = Number(dto.agreedAmountToSave)/months;
          const contributions = [];

          for (let i=0; i<months; i++){
            const dueDate = new Date(dto.startDate);
            dueDate.setMonth(dueDate.getMonth() + i);

            const contribution = new MonthlyContributions();
            contribution.amountDue = monthlyAmount;
            contribution.amountPaid = 0;
            contribution.status = MonthlyContributionStatus.Pending;
            contribution.paymentDate = null;
            contribution.dueDate = dueDate;
            contribution.transactions = [];
            contributions.push(contribution)
          }
          return contributions;
        }
        // async adjustMonthlyContribution(contributionId: string, newAgreedAmount: number): Promise<Contributions> {
        //     const contribution = await this.contributionsRepository.findOne({ where: { contributionsId: contributionId } });
        
        //     if (!contribution) {
        //       throw new Error('Contribution not found');
        //     }
        
    
        //     contribution.agreedMonthlyAmount = newAgreedAmount;
        
        //     await this.contributionsRepository.save(contribution);
        
        //     return contribution;
        //   }

        async cancelContribution(contributionsId: string): Promise<Contributions> {
          // Fetch the contribution
          const contribution = await this.contributionsRepository.findOne({
              where: { contributionsId },
              relations: ['monthlyContributions'], 
          });
      
          if (!contribution) {
              throw new NotFoundException('Contribution not found');
          }
      
          if (contribution.status !== ContributionStatus.Active) {
              throw new Error('Contribution is not active and cannot be canceled');
          }
      
          // Update contribution status to Terminated
          contribution.status = ContributionStatus.Terminated;
      
          // Update associated MonthlyContributions to reflect cancellation
          contribution.monthlyContributions.forEach((monthly) => {
              if (monthly.status === MonthlyContributionStatus.Pending) {
                  monthly.status = MonthlyContributionStatus.Defaulted; 
              }
          });
      
          
          await this.monthlyContributionsRepository.save(contribution.monthlyContributions);
      
          
          contribution.totalAmountLeft = 0;
          contribution.totalAmountPaid = 0;
      
          
          const updatedContribution = await this.contributionsRepository.save(contribution);
      
          return updatedContribution;
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
