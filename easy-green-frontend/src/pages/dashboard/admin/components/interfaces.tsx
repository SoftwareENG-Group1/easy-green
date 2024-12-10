/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Borrower {
    borrowerId: number;
    bvn: string;
    NINNumber: string | null;
    passportPhoto: string | null;
    driversLicense: string | null;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    employmentStatus: string;
    nextOfKinFirstName: string;
    nextOfKinLastName: string;
    nextOfKinPhoneNumber: string;
    nextOfKinRelationship: string;
    nextOfKinStreet: string;
    nextOfKinCountry: string;
    companyName: string;
    jobTitle: string;
    companyAddress: string;
    occupation: string;
    accountNumber: string;
    monthlyIncome: string;
    bankName: string;
  }
  
 export interface Loan {
    loanId: string;
    purpose: string;
    description: string;
    loanAmount: string;
    amortizationPeriod: number;
    interestRate: string;
    startDate: string;
    endDate: string;
    outstandingBalance: string;
    dueDate: string;
    approvalDate: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    borrowerId: number;
    monthlyPayments: number[]; 
    borrower: Borrower;
  }

 export interface Client {
    client: string;
    email: string;
    loanId: string;
    loanAmount: string;
    balance: string;
    paymentDate: string;
    status: string;
  }

 export interface AdminClientModalProps {
    open: boolean;
    onClose: () => void;
    client: Client | null;
  }

export interface BorrowerDetail {
  borrower: any;
  loanId: string;
  loanAmount: number;
  outstandingBalance: number;
  dueDate: string;
  status: string;
}