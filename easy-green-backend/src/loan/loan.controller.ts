/* eslint-disable prettier/prettier */
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entity/loan.entity';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) { }


    // Create a new loan
    @Post()
    @ApiOperation({ summary: 'Create a new loan' })
    @ApiBody({ type: CreateLoanDto })
    @ApiResponse({
        status: 201,
        description: 'The loan has been successfully created.',
        type: Loan,
    })
    @UsePipes(new ValidationPipe())
    async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
        return this.loanService.createLoan(createLoanDto);
    }

    // Get all loans
    @Get()
    @ApiOperation({ summary: 'Get All Loans ' })
    @ApiResponse({
        status: 200,
        description: 'List of all loans.',
        type: [Loan],
    })
    async findAll(): Promise<Loan[]> {
        return this.loanService.findall();
    }

    // Get a users maximum loan amount
    @Get('max-loan-amount/:borrowerId')
    @ApiOperation({ summary: 'Get a borrower\'s maximum loan amount' })
    @ApiParam({ name: 'borrowerId', type: Number, description: 'Borrower ID' })
    @ApiResponse({
        status: 200,
        description: 'Maximum loan amount for the specified borrower is returned.',
        type: Number,
    })
    async findMaxLoanAmount(@Param('borrowerId') borrowerId: number): Promise<number> {
        return this.loanService.getUsersMaxLoanAmount(borrowerId);
    }

    // Get all loans for a specific borrower
    @Get('borrower/:borrowerId')
    @ApiOperation({ summary: 'Get all loans for a specific borrower' })
    @ApiParam({ name: 'borrowerId', type: Number, description: 'Borrower ID' })
    @ApiResponse({
        status: 200,
        description: 'List of loans for the specified borrower.',
        type: [Loan],
    })
    async findByBorrower(@Param('borrowerId') borrowerId: number): Promise<Loan[]> {
        return this.loanService.findAllLoansByBorrowerId(borrowerId);
    }

    // Get a single loan by ID
    @Get(':id')
    @ApiOperation({ summary: 'Get a loan by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Loan ID' })
    @ApiResponse({
        status: 200,
        description: 'The loan has been successfully retrieved.',
        type: Loan,
    })
    async findOne(@Param('id') loanId: string): Promise<Loan> {
        return this.loanService.findOneById(loanId);
    }

    // Get a single loan by borrower ID and loan ID
    @Get('borrower/:borrowerId/:loanId')
    @ApiOperation({ summary: 'Get a specific loan for a specific borrower' })
    @ApiParam({ name: 'borrowerId', type: Number, description: 'Borrower ID' })
    @ApiParam({ name: 'loanId', type: String, description: 'Loan ID' })
    @ApiResponse({
        status: 200,
        description: 'The loan has been successfully retrieved.',
        type: Loan,
    })
    async findOneLoanByBorrower(@Param('borrowerId') borrowerId: number, @Param('loanId') loanId: string): Promise<Loan> {
        return this.loanService.findOneLoanByBorrowerId(borrowerId, loanId);
    }

    // Approve a borrowers loan
    @Patch('approve/:id')
    @ApiOperation({ summary: 'Approve a borrowers loan' })
    @ApiParam({ name: 'id', type: String, description: 'Loan ID' })
    @ApiResponse({ status: 200, description: 'The loan has been successfully approved', type: Loan })
    @ApiResponse({ status: 404, description: 'Loan not found' })
    @ApiResponse({ status: 400, description: 'Loan cannot be approved' })
    async approve(@Param('id') loanId: string): Promise<{ message: string; loan: Loan }> {
        const loan = await this.loanService.approveBorrowerLoan(loanId);
        return { message: 'Loan approved successfully', loan };
    }

}
