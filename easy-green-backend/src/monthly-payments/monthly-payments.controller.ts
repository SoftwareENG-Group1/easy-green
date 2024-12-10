import { Body, Controller, Param, Post } from '@nestjs/common';
import { MonthlyPaymentsService } from './monthly-payments.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateMonthlyPaymentsDto } from './dto/create-monthly-payments.dto';
import { CreateLoanDto } from 'src/loan/dto/create-loan.dto';
import { MonthlyPayment } from './entity/monthly-payments.entity';
import { Loan } from 'src/loan/entity/loan.entity';

@Controller('monthly-payments')
export class MonthlyPaymentsController {
    constructor(private readonly monthlyPaymentsService: MonthlyPaymentsService) {}

    @Post(':loanID')
    @ApiOperation({ summary: 'When a loan is created and is approved, populate the MonthlyPayments table' })
    @ApiParam({ name: 'loanID', type: String, description: 'Loan ID' })
    @ApiBody({ type: CreateMonthlyPaymentsDto })
    @ApiResponse({
        status: 201,
        description: 'The monthly payments have been created',
        type: [MonthlyPayment],
    })
    async create(
        @Body() createMonthlyPaymentsDto: CreateMonthlyPaymentsDto,
        @Param('loanID') loanId: string,
    ): Promise<MonthlyPayment[]> {
        return await this.monthlyPaymentsService.fillMonthlyPayments(loanId, createMonthlyPaymentsDto);
    }
}
