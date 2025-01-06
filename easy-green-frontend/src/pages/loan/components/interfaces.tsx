export interface LoanData {
	purpose: string;
	description: string;
	loanAmount: number;
	amortizationPeriod: number;
	interestRate: number;
	startDate: string; // Use ISO date string
	endDate: string; // Use ISO date string
	status: "Active" | "Closed" | "Pending"; // Add other statuses if applicable
	borrowerId: number;
}