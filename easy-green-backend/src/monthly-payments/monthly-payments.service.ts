import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/loan/entity/loan.entity';
import { LoanPaymentStatus, MonthlyPayment } from './entity/monthly-payments.entity';
import { Repository } from 'typeorm';
import { CreateLoanDto } from 'src/loan/dto/create-loan.dto';
import { CreateMonthlyPaymentsDto } from './dto/create-monthly-payments.dto';

@Injectable()
export class MonthlyPaymentsService {
    constructor(
        @InjectRepository(MonthlyPayment)
        private readonly monthlyPaymentsRepository: Repository<MonthlyPayment>,
        @InjectRepository(Loan)
        private readonly loanRepository: Repository<Loan>,
    ) { }

    async fillMonthlyPayments(loanId: string, createLoans: CreateMonthlyPaymentsDto): Promise<MonthlyPayment[]> {
        const loans = await this.loanRepository.findOne({
            where: { loanId: loanId },
        })
        
        if (!loans) {
            throw new BadRequestException('Loan does not exists')
        }

        const monthlyPayments = this.calculateMonthlyPayments(loans.loanAmount, loans.interestRate, loans.amortizationPeriod)
        loans.amountToBePaidMonthly = monthlyPayments;
        await this.loanRepository.save(loans);

        // Populate the monthly payments table
        await this.populateMonthlyPaymentsTable(loans, createLoans, monthlyPayments);
        return this.getMonthlyPayments(loanId)
        
    }

    calculateMonthlyPayments(totalAmount: number, interestRate: number, totalNumberOfPayments: number): number {
        const monthlyInterestRate = interestRate / 12 / 100; // divide through
        // Calculate the monthly payment using the amortization formula
        const numerator = totalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalNumberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, totalNumberOfPayments) - 1;

        if (denominator === 0) {
            throw new BadRequestException('Invalid calculation: Check interest rate and payment period.');
        }

        return Math.round((numerator / denominator) * 100) / 100; // Round to 2 decimal places
    }

    getLoanFromLoanID(loanID: string): Promise<Loan>{
        const loans = this.loanRepository.findOne({
            where: {loanId: loanID}
        })
        return loans;
    }

    private async populateMonthlyPaymentsTable(
        loan: Loan,
        details: CreateMonthlyPaymentsDto,
        monthlyPaymentAmount: number
    ): Promise<void> {
        const { loanAmount, interestRate, amortizationPeriod } = loan;
        let remainingBalance = loanAmount;

        for (let i = 1; i <= amortizationPeriod; i++) {
            // Calculate the interest for the month
            const monthlyInterest = (remainingBalance * interestRate) / 12 / 100;

            // Calculate the principal portion of the payment
            const principal = monthlyPaymentAmount - monthlyInterest;

            // Reduce the remaining balance
            remainingBalance -= principal;

            // Ensure the balance doesn't go negative
            if (remainingBalance < 0) remainingBalance = 0;

            // Create and save the monthly payment record
            const paymentDate = new Date();
            paymentDate.setMonth(paymentDate.getMonth() + i - 1);

            const monthlyPayment = this.monthlyPaymentsRepository.create({
                loan,
                principal: Math.round(principal * 100) / 100, // Round to 2 decimal places
                interest: Math.round(monthlyInterest * 100) / 100, // Round to 2 decimal places
                status: LoanPaymentStatus.Pending,
                monthlyInterestRate: Math.round((interestRate / 12 / 100) * 100) / 100,
                amountPaid: 0, // Initially no payment is made
                paymentDate, // Incremented payment date
            });

            await this.monthlyPaymentsRepository.save(monthlyPayment);
        }
    }
   async getMonthlyPayments(loanId: string): Promise<MonthlyPayment[]> {
    const loan = await this.loanRepository.findOne({
        where: { loanId },
        relations: ['monthlyPayments'],
        order: {
            monthlyPayments:{
                paymentDate: "ASC"
            }
        }
        });
    if (!loan) {
        throw new BadRequestException('Loan does not exist');
    }
    return loan.monthlyPayments;
   }
}
