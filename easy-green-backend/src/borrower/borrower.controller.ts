import { Body, Controller, Param, Post } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { Borrower } from './entity/borrower.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('borrower')
export class BorrowerController {
    constructor(private readonly borrowerService: BorrowerService) { }

    @Post(':userId')
    @ApiOperation({ summary: 'Create a new borrower' })
    @ApiBody({ type: CreateBorrowerDto })
    @ApiResponse({
      status: 201,
      description: 'The borrower has been successfully created.',
      type: Borrower
    })
    async createBorrower(
        @Param('userId') userId: number,
        @Body() createBorrowerDto: CreateBorrowerDto,
      ): Promise<Borrower> {
        return this.borrowerService.create(createBorrowerDto, userId);
      }
}
