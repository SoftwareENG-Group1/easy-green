import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { Contributions } from './entity/contributions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from 'src/borrower/entity/borrower.entity';
import { MonthlyContributions } from 'src/monthly-contributions/entity/monthly-contributions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contributions, Borrower, MonthlyContributions])],
  providers: [ContributionsService],
  controllers: [ContributionsController],
  exports: [ContributionsService, TypeOrmModule]
})
export class ContributionsModule {}
