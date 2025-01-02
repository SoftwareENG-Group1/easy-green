import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './entity/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from 'src/borrower/entity/borrower.entity';
import { ContributionsModule } from 'src/contributions/contributions.module';
import { MonthlyContributionsModule } from 'src/monthly-contributions/monthly-contributions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, Borrower]), ContributionsModule, MonthlyContributionsModule],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
