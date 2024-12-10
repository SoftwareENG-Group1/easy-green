import axiosInstance from "../../../../components/axiosInstance";
import { AxiosError } from "axios";

export const createUser = async (data: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.post("/user", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "An error occurred during step submission.");
    } else {
      throw new Error("An unknown error occurred during step submission.");
    }
  }
};

export const createBorrower = async (data: Record<string, unknown>, userId: unknown) => {
    try {
      const response = await axiosInstance.post(`/borrower/${userId}`, data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "An error occurred during step submission.");
      } else {
        throw new Error("An unknown error occurred during step submission.");
      }
    }
  };

