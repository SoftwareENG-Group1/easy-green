import { Module } from '@nestjs/common';
import { MonthlyContributionsService } from './monthly-contributions.service';
import { MonthlyContributionsController } from './monthly-contributions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyContributions } from './entity/monthly-contributions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyContributions])],
  providers: [MonthlyContributionsService],
  controllers: [MonthlyContributionsController]
})
export class MonthlyContributionsModule {}
