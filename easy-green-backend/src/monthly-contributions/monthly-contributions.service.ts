/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contributions } from 'src/contributions/entity/contributions.entity';
import { Repository } from 'typeorm';
import { MonthlyContributions, MonthlyContributionStatus } from './entity/monthly-contributions.entity';

@Injectable()
export class MonthlyContributionsService {
    constructor(
        @InjectRepository(MonthlyContributions)
        private readonly monthlyContributionsRepository: Repository<MonthlyContributions>,
        @InjectRepository(Contributions)
        private readonly contributionsRepository: Repository<Contributions>,
      ) {}
    

      async createMonthlyContribution(contributionId: string, amountPaid: number): Promise<MonthlyContributions> {
        const contribution = await this.contributionsRepository.findOne({ where: { contributionsId: contributionId } });

    if (!contribution) {
      throw new Error('Contribution not found');
    }

    const monthlyContribution = this.monthlyContributionsRepository.create({
      contributions: contribution, 
      amountPaid, 
      status: MonthlyContributionStatus.Pending, 
      paymentDate: new Date(), 
    });

    
    const savedMonthlyContribution = await this.monthlyContributionsRepository.save(monthlyContribution);

    
    contribution.totalAmount += amountPaid;  
    await this.contributionsRepository.save(contribution);  

    if (savedMonthlyContribution.amountPaid >= contribution.agreedMonthlyAmount) {
        savedMonthlyContribution.status = MonthlyContributionStatus.Paid;
        await this.monthlyContributionsRepository.save(savedMonthlyContribution);
      }
  
    return savedMonthlyContribution;
      }
    
    
      
      async findByContributionId(contributionId: string): Promise<MonthlyContributions[]> {
        return await this.monthlyContributionsRepository.find({
          where: { contributions: { contributionsId: contributionId } },
          order: { paymentDate: 'ASC' }, 
        });
      }
}
