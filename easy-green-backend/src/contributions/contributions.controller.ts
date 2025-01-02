/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionsDto } from './dto/create-contributions.dto';
import { Contributions } from './entity/contributions.entity';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateContributionsDto } from './dto/update-contributions.dto';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  // Create a new contribution
  @Post()
  @ApiOperation({ summary: 'Create a new contribution' })
  @ApiBody({ type: CreateContributionsDto })
  @ApiResponse({
    status: 201,
    description: 'The contribution has been successfully created.',
    type: Contributions,
  })
  async create(@Body() createContributionsDto: CreateContributionsDto): Promise<Contributions> {
    return this.contributionsService.createContributions(createContributionsDto);
  }

  // Get all contributions
  @Get()
  @ApiOperation({ summary: 'Get all contributions' })
  @ApiResponse({
    status: 200,
    description: 'List of all contributions.',
    type: [Contributions],
  })
  async findAll(): Promise<Contributions[]> {
    return this.contributionsService.findAll();
  }

  // Get a single contribution by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a contribution by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Contribution ID' })
  @ApiResponse({
    status: 200,
    description: 'The contribution has been successfully retrieved.',
    type: Contributions,
  })
  async findOne(@Param('id') contributionsId: string): Promise<Contributions> {
    return this.contributionsService.findOneById(contributionsId);
  }

  // Get all contributions for a specific borrower
  @Get('borrower/:borrowerId')
  @ApiOperation({ summary: 'Get all contributions for a specific borrower' })
  @ApiParam({ name: 'borrowerId', type: Number, description: 'Borrower ID' })
  @ApiResponse({
    status: 200,
    description: 'List of contributions for the specified borrower.',
    type: [Contributions],
  })
  async findByBorrower(@Param('borrowerId') borrowerId: number): Promise<Contributions[]> {
    return this.contributionsService.findByBorrowerId(borrowerId);
  }

  @ApiOperation({ summary: 'Cancel a contribution and set it as inactive' })
    @ApiParam({ name: 'id', description: 'ID of the contribution to cancel' })
    @ApiResponse({ status: 200, description: 'Contribution successfully set as inactive' })
    @ApiResponse({ status: 404, description: 'Contribution not found' })
    @Patch(':id/cancel')
    async cancelContribution(@Param('id') id: string) {
        return this.contributionsService.cancelContribution(id);
    }
  // Adjust the monthly contribution amount
  // @Patch(':id')
  // @ApiOperation({ summary: 'Adjust the agreed monthly contribution amount' })
  // @ApiParam({ name: 'id', type: String, description: 'Contribution ID' })
  // @ApiBody({ type: UpdateContributionsDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The contribution has been successfully adjusted.',
  //   type: Contributions,
  // })
  // async adjust(
  //   @Param('id') id: string,
  //   @Body() updateContributionsDto: { newAgreedAmount: number },
  // ): Promise<Contributions> {
  //   return this.contributionsService.adjustMonthlyContribution(id, updateContributionsDto.newAgreedAmount);
  // }
}
