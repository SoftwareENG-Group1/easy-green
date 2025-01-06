// models/LoanPayment.ts
export interface LoanPayment {
	paymentId: string;
	loan: string;
	principal: number;
	interest: number;
	status: string;
	transactions: Transaction[];
	monthlyInterestRate: number;
	amountPaid: number;
	paymentDate: string;
}

export interface Transaction {
	transactionId: string;
	amountPaid: number;
	type: string;
	purpose: string;
	transactionDate: string;
	borrower: string;
	monthlyPayments: string;
	monthlyContributions: MonthlyContributions;
}

export interface MonthlyContributions {
	monthlyContributionsId: string;
	contributions: Contributions;
	amountDue: number;
	amountPaid: number;
	status: string;
	transactions: string[];
	paymentDate: string;
	dueDate: string;
}

export interface Contributions {
	contributionsId: string;
	purpose: string;
	description: string;
	totalAmountLeft: number;
	totalAmountPaid: number;
	agreedAmountToSave: number;
	status: string;
	startDate: string;
	endDate: string;
	monthlyContributions: string[];
	interestRate: number;
	createdAt: string;
	updatedAt: string;
	borrower: string;
}
