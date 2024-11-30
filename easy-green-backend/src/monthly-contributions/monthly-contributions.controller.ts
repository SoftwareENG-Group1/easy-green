/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MonthlyContributions } from './entity/monthly-contributions.entity';
import { MonthlyContributionsService } from './monthly-contributions.service';
import { CreateMonthlyContributionsDto } from './dto/create-monthly-contributions.dto';

@Controller('monthly-contributions')
export class MonthlyContributionsController {
    constructor(private readonly monthlyContributionsService: MonthlyContributionsService) {}

  @ApiOperation({ summary: 'Create a monthly contribution' })
  @ApiResponse({ status: 201, description: 'Monthly contribution created', type: MonthlyContributions })
  @Post()
  async create(
    @Body() createMonthlyContributionDto: CreateMonthlyContributionsDto
  ): Promise<MonthlyContributions> {
    const { contributionId, amountPaid } = createMonthlyContributionDto;
    return this.monthlyContributionsService.createMonthlyContribution(contributionId, amountPaid);
  }

  @ApiOperation({ summary: 'Get all monthly contributions by contributionId' })
  @ApiResponse({ status: 200, description: 'Returns a list of monthly contributions for a specific contributionId', type: [MonthlyContributions] })
  @Get('contribution/:contributionId')
  async findByContributionId(
    @Param('contributionId') contributionId: string,
  ): Promise<MonthlyContributions[]> {
    return this.monthlyContributionsService.findByContributionId(contributionId);
  }
}
