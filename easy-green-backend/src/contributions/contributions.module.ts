import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { Contributions } from './entity/contributions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contributions])],
  providers: [ContributionsService],
  controllers: [ContributionsController]
})
export class ContributionsModule {}
