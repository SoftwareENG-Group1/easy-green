import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios"; // Import AxiosError for type-checking

// Login user
export const loginUser = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };

  try {
    const response = await axiosInstance.post("/auth/login", body);
    return response.data;
  } catch (error: unknown) {
    // Check if the error is an AxiosError using 'instanceof'
    if (error instanceof AxiosError) {
         console.log('Login failed:', error.message);
      // Access response data from the AxiosError
      throw new Error(error.response?.data?.message || "An error occurred during login.");
    } else {
      // For any other errors that are not AxiosError
      throw new Error("An unknown error occurred during login.");
    }
  }
};
