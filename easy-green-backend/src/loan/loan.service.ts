import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan, LoanStatus } from './entity/loan.entity';
import { Repository } from 'typeorm';
import { MonthlyPayment } from 'src/monthly-payments/entity/monthly-payments.entity';
import { Borrower } from 'src/borrower/entity/borrower.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Contributions, ContributionStatus } from 'src/contributions/entity/contributions.entity';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(Loan)
        private readonly loanRepository: Repository<Loan>,
        // @InjectRepository(MonthlyPayment)
        // private readonly monthlyPaymentRepository: Repository<MonthlyPayment>,
        @InjectRepository(Borrower)
        private readonly borrowerRepository: Repository<Borrower>,
        @InjectRepository(Contributions)
        private readonly contributionsRepository: Repository<Contributions>,
    ) { }

    async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
        const borrower = await this.borrowerRepository.findOne({
            where: { borrowerId: createLoanDto.borrowerId },
            relations: ['transactions']
        })

        // Get all the debit transactions of the borrower
        const usersDebitTransactions = borrower?.transactions?.filter((transaction) => transaction.type === 'Debit') ?? [];
        if(usersDebitTransactions.length === 0){
            // User is a new borrower and has not made any transactions either contributions or loan payments
            // make maximum loan amount 50% of his/her monthly salary per anumn
            const monthlyIncomePerAnnum = borrower.monthlyIncome * 12;
            const maxLoanAmount = monthlyIncomePerAnnum * 0.5;
            if(createLoanDto.loanAmount > maxLoanAmount){
                throw new BadRequestException('Loan amount exceeds the maximum loan amount, Users maximum loan amount is ' + maxLoanAmount);
            }
        }else{
            // User is not a new borrower and has made transactions either contributions or loan payments
            // make maximum loan amount 200% of his/her debit transactions
            const totalDebitTransactionsAmount = usersDebitTransactions.reduce((acc, transaction)=> acc + transaction.amountPaid, 0);
            const maxLoanAmount = totalDebitTransactionsAmount * 2;
            if(createLoanDto.loanAmount > maxLoanAmount){
                throw new BadRequestException('Loan amount exceeds the maximum loan amount, Users maximum loan amount is ' + maxLoanAmount);
            }
        }

        if (!borrower) {
            throw new NotFoundException('Borrower not found');
        }
         // Check if the borrower has an active loan
        const loanExists = await this.loanRepository.findOne({
            where: {borrowerId: borrower.borrowerId, status: LoanStatus.Active}
        })

        if (loanExists) {
            throw new BadRequestException('Borrower already has an active loan');
        }

        const currentlyContributing = await this.contributionsRepository.findOne({
            where: {borrower: borrower, status: ContributionStatus.Active}
        })
        if (currentlyContributing) {
            throw new BadRequestException('Borrower is currently contributing to a contribution');
        }
        const loan = this.loanRepository.create({
            purpose: createLoanDto.purpose,
            description: createLoanDto.description,
            loanAmount: createLoanDto.loanAmount,
            amortizationPeriod: createLoanDto.amortizationPeriod,
            interestRate: createLoanDto.interestRate,
            startDate: new Date(createLoanDto.startDate),
            endDate: new Date(createLoanDto.endDate),
            status: LoanStatus.Pending, // loans are pending until they are approved by admin
            createdAt: new Date(),
            updatedAt: new Date(),
            borrowerId: borrower.borrowerId,
            monthlyPayments: [],
            dueDate: new Date(createLoanDto.startDate), // the due date is the same as the start date at the beginning until the loan is approved
            outstandingBalance: createLoanDto.loanAmount, // the outstanding balance is the same as the loan amount at the beginning

        });
        const savedLoan = await this.loanRepository.save(loan);
        return savedLoan;
    }

    async getUsersMaxLoanAmount(borrowerId: number): Promise<number> {
        const borrower = await this.borrowerRepository.findOne({
            where: { borrowerId: borrowerId },
            relations: ['transactions']
        })

        // Get all the debit transactions of the borrower
        const usersDebitTransactions =  borrower.transactions.filter(transaction=> transaction.type === 'Debit');
        if(usersDebitTransactions.length === 0){
            // User is a new borrower and has not made any transactions either contributions or loan payments
            // make maximum loan amount 50% of his/her monthly salary per anumn
            const monthlyIncomePerAnnum = borrower.monthlyIncome * 12;
            const maxLoanAmount = monthlyIncomePerAnnum * 0.5;
            return maxLoanAmount;
        }else{
            // User is not a new borrower and has made transactions either contributions or loan payments
            // make maximum loan amount 200% of his/her debit transactions
            const totalDebitTransactionsAmount = usersDebitTransactions.reduce((acc, transaction)=> acc + transaction.amountPaid, 0);
            const maxLoanAmount = totalDebitTransactionsAmount * 2;
            return maxLoanAmount;
        }
    }

    async findall(): Promise<Loan[]> {
        return this.loanRepository.find({
            relations: ['monthlyPayments', 'borrower'],
        });
    }

    async findAllLoansByBorrowerId(borrowerId: number): Promise<Loan[]> {

        const borrower = await this.borrowerRepository.find({ where: { borrowerId: borrowerId } });
        const loans = await this.loanRepository.find({
            where: { borrowerId: borrowerId },
            relations: ['monthlyPayments', 'borrower']
        });
        if (loans.length === 0) {
            throw new NotFoundException('No loans found for borrower');
        }
        if (!borrower) {
            throw new NotFoundException('Borrower not found');
        }

        return loans;
    }

    async findOneById(loanId: string): Promise<Loan> {
        const loan = await this.loanRepository.findOne({
            where: { loanId },
            relations: ['monthlyPayments', 'borrower'],
        });

        if (!loan) {
            throw new NotFoundException('Loan not found');
        }

        return loan;
    }

    async findOneLoanByBorrowerId(borrowerId: number, loanId: string): Promise<Loan> {
        const borrower = await this.borrowerRepository.findOne({ where: { borrowerId } });
        if (!borrower) {
            throw new NotFoundException('Borrower not found');
        }
        const loan = await this.loanRepository.findOne({
            where: { borrowerId: borrower.borrowerId, loanId: loanId },
            relations: ['monthlyPayments', 'borrower'],
        });

        if (!loan) {
            throw new NotFoundException('Loan not found');
        }
        return loan;
    }

    async approveBorrowerLoan(loanId: string): Promise<Loan> {
        const loan = await this.loanRepository.findOne({ where: { loanId } });
        if (!loan) {
            throw new NotFoundException('Loan not found');
        }
        loan.status = LoanStatus.Active;
        loan.approvalDate = new Date();
        const currentDate = new Date();
        const dueDate = new Date(currentDate);
        dueDate.setMonth(dueDate.getMonth() + loan.amortizationPeriod); // set the due date to the current date + the amortization period in months
        loan.dueDate = dueDate;
        
        await this.loanRepository.save(loan);
        return loan;
    }


}
