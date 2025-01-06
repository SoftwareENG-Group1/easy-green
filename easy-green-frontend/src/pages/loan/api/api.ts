import axiosInstance from "../../../components/axiosInstance";
import { AxiosError } from "axios";
import { LoanData } from "../components/interfaces";

export const createLoan = async (loanData: LoanData): Promise<LoanData> => {
  try {
    const response = await axiosInstance.post<LoanData>("/loan", loanData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to create loan.");
    } else {
      throw new Error("An unknown error occurred while creating the loan.");
    }
  }
};

// Function to fetch a loan by ID
export const fetchLoanById = async (loanId: string) => {
  try { 
    const response = await axiosInstance.get(`/loan/${loanId}`);
    return response.data; // Return the loan data
  } catch (error: unknown) {
  
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch loan details.");
    } else {
      throw new Error("An unknown error occurred while fetching loan details.");
    }
  }
};

