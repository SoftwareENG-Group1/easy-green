/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MonthlyContributionsService } from './monthly-contributions.service';
import { MonthlyContributionsController } from './monthly-contributions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyContributions } from './entity/monthly-contributions.entity';
import { Contributions } from 'src/contributions/entity/contributions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyContributions, Contributions])],
  providers: [MonthlyContributionsService],
  controllers: [MonthlyContributionsController],
  exports: [MonthlyContributionsService],
})
export class MonthlyContributionsModule {}
