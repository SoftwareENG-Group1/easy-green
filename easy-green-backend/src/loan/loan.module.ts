import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entity/loan.entity';
import { MonthlyPaymentsModule } from 'src/monthly-payments/monthly-payments.module';
import { BorrowerModule } from 'src/borrower/borrower.module';
import { ContributionsModule } from 'src/contributions/contributions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Loan]), 
MonthlyPaymentsModule, BorrowerModule, ContributionsModule],
  providers: [LoanService],
  controllers: [LoanController],
  exports: [LoanService, TypeOrmModule]
})
export class LoanModule {}
