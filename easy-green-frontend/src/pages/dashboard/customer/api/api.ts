import { AxiosError } from "axios";
import axiosInstance from "../../../../components/axiosInstance";

// Function to populate MonthlyPayments table for a loan
export const createMonthlyPayments = async (
    loanId: string,
    paymentData: {
        paymentId: string;
        loanId: string;
        amountPaid: number;
        paymentDate: string;
    }
) => {
    try {
        // POST request to create monthly payments
        const response = await axiosInstance.post(
            `/monthly-payments/${loanId}`,
            paymentData
        );
        return response.data; // Return the response data
    } catch (error: unknown) {
        // Handle errors
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.message || "Failed to populate monthly payments."
            );
        } else {
            throw new Error(
                "An unknown error occurred while populating monthly payments."
            );
        }
    }
};