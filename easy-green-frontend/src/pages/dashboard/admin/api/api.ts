import axiosInstance from "../../../../components/axiosInstance";
import { AxiosError } from "axios";
import { Loan } from "../components/interfaces";

export const fetchLoans = async () => {
  try {
    const response = await axiosInstance.get("/loan");
    if (Array.isArray(response.data)) {
      return response.data; // If it's an array, return it
    } else {
      throw new Error("Expected an array of loans.");
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch loan data.");
    } else {
      throw new Error("An unknown error occurred while fetching loan data.");
    }
  }
};

export const fetchAllBorrowers = async () => {
  try {
    const response = await axiosInstance.get(`/borrower`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch borrower details.");
    } else {
      throw new Error("An unknown error occurred while fetching borrower details.");
    }
  }
};

// Fetch borrower details for a given loan
export const fetchBorrowerDetails = async (loan: Loan) => {
  try {
    const response = await axiosInstance.get(`/borrower/${loan.borrowerId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch borrower details.");
    } else {
      throw new Error("An unknown error occurred while fetching borrower details.");
    }
  }
};

// Fetch clients with loan and borrower details
export const fetchClients = async () => {
  try {
    const loans = await fetchLoans();
    if (!Array.isArray(loans)) {
      throw new Error("Fetched data is not an array.");
    }

    const borrowerDetails = await Promise.all(
      loans.map(async (loan: Loan) => {
        const borrower = await fetchBorrowerDetails(loan);
        return { ...loan, borrower };
      })
    );
    return borrowerDetails;
  } catch (error) {
    throw new Error(`${error} Failed to fetch client data.`);
  }
};