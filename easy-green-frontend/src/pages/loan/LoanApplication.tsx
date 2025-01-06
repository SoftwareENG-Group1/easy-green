import React, { useState } from "react";
import EasyGreenLogo from "../../assets/images/Easy-Green.png";
import rightArrow from "../../assets/icons/arrow-right.svg";
import menu from "../../assets/icons/Menu.svg";
import { createLoan } from "./api/api";
import { AxiosError } from "axios";
import { LoanData } from "./components/interfaces";

const ApplyForLoan = () => {
	const [salaryAmount, setSalaryAmount] = useState("");
	const [salaryPeriod, setSalaryPeriod] = useState("");
	const [loanPurpose, setLoanPurpose] = useState("");
	const [loanAmount, setLoanAmount] = useState("");
	const [interestRate, setInterestRate] = useState("");
	const [loanTerm, setLoanTerm] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!salaryAmount ||
			!salaryPeriod ||
			!loanPurpose ||
			!loanAmount ||
			!interestRate ||
			!loanTerm
		) {
			setError("All fields are required");
		} else {
			setError("");
			handleCreateLoan();
		}
	};
	const calculateDates = (
		loanTerm: string
	): { startDate: string; endDate: string } => {
		// Step 1: Extract the number of months from the loan term
		const months = parseInt(loanTerm.replace(" Months", ""), 10);

		if (isNaN(months)) {
			throw new Error(
				"Invalid loan term format. Please provide a valid term (e.g., '12 Months')."
			);
		}

		// Step 2: Get the current date as the start date
		const startDate = new Date();

		// Step 3: Calculate the end date
		const endDate = new Date(startDate); // Clone the start date
		endDate.setMonth(endDate.getMonth() + months); // Add the loan term (in months)

		// Format dates as ISO strings (optional, depends on your API format)
		const formattedStartDate = startDate.toISOString(); // e.g., "2025-01-06T10:15:30.000Z"
		const formattedEndDate = endDate.toISOString();

		return {
			startDate: formattedStartDate,
			endDate: formattedEndDate,
		};
	};

	const handleCreateLoan = async () => {
		const dates = calculateDates(loanTerm);
		console.log(loanTerm);
		const loanPayload: LoanData = {
			purpose: loanPurpose,
			description: "",
			loanAmount: Number(loanAmount),
			amortizationPeriod: parseInt(loanTerm.replace(" Months", ""), 10), // in months
			interestRate: Number(interestRate), // in percentage
			startDate: dates.startDate,
			endDate: dates.endDate,
			status: "Active",
			borrowerId: 1,
		};

		try {
			const createdLoan = await createLoan(loanPayload);
			console.log("Loan created successfully:", createdLoan);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				console.error(error.message);
			}
		}
	};

	return (
		<div className="flex min-h-screen">
			{/* Left side: Loan Application Form */}
			<div className="flex flex-col items-center justify-center w-full h-screen pl-8 bg-white sm:w-2/3">
				<div className="h-[50px]"></div>
				<div className="absolute top-[50px] left-4 ">
					<button className="text-gray-800">
						{/* Add your hamburger icon here, like using a material icon or a custom SVG */}
						<img
							src={menu}
							alt="Right Arrow"
							className="w-[32.29] h-[30.1px]"
						/>
					</button>
				</div>
				<h2 className="text-[48px] font-bold text-black mb-2 font-[Glowfor]">
					Apply For Loan
				</h2>

				{error && <div className="mb-4 text-red-500">{error}</div>}
				<div className="h-[90px]"></div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center w-full h-screen pl-8 bg-white sm:w-2/3"
				>
					{/* Salary Amount */}
					<div className="mb-6">
						<label
							className="block text-sm text-gray-700 font-sans text-[14px]"
							htmlFor="salaryAmount"
						>
							Salary Amount
						</label>
						<input
							type="text"
							id="salaryAmount"
							name="salaryAmount"
							value={salaryAmount}
							onChange={(e) => setSalaryAmount(e.target.value)}
							className="w-[619px] mt-2 h-[40px] p-4 border border-gray-300 bg-white rounded-md text-gray-700 focus:border-gray-800 focus:outline-none placeholder:text-[16px] placeholder:text-[#94A3B8]"
						/>
					</div>

					{/* Salary Period */}
					<div className="mb-6">
						<label
							className="block text-sm text-gray-700 font-sans text-[14px]"
							htmlFor="salaryPeriod"
						>
							Salary Period
						</label>
						<input
							type="text"
							id="salaryPeriod"
							name="salaryPeriod"
							value={salaryPeriod}
							onChange={(e) => setSalaryPeriod(e.target.value)}
							className="w-[619px] mt-2 h-[40px] p-4 border border-gray-300 bg-white rounded-md text-gray-700 focus:border-gray-800 focus:outline-none placeholder:text-[16px] placeholder:text-[#94A3B8]"
							placeholder="eg. last friday of every month, 25th of every month"
						/>
					</div>

					{/* Purpose of Loan */}
					<div className="mb-6">
						<label
							className="block text-sm text-gray-700 font-sans text-[14px]"
							htmlFor="loanPurpose"
						>
							Purpose of the Loan
						</label>
						<input
							type="text"
							id="loanPurpose"
							name="loanPurpose"
							value={loanPurpose}
							onChange={(e) => setLoanPurpose(e.target.value)}
							className="w-[619px] mt-2 h-[56.6px] p-4 border border-gray-300 bg-white rounded-md text-gray-700 focus:border-gray-800 focus:outline-none placeholder:text-[16px] placeholder:text-[#94A3B8]"
							placeholder="Purpose"
						/>
					</div>

					{/* Loan Amount */}
					<div className="mb-6">
						<label
							className="block text-sm text-gray-700 font-sans text-[14px]"
							htmlFor="loanAmount"
						>
							Loan Amount
						</label>
						<input
							type="number"
							id="loanAmount"
							name="loanAmount"
							value={loanAmount}
							onChange={(e) => setLoanAmount(e.target.value)}
							className="w-[619px] mt-2 h-[40px] p-4 border border-gray-300 bg-white rounded-md text-gray-700 focus:border-gray-800 focus:outline-none placeholder:text-[16px] placeholder:text-[#94A3B8]"
							placeholder="Loan Amount"
						/>
					</div>

					{/* Interest Rate */}
					<div className="mb-6">
						<label
							className="block text-sm text-gray-700 font-sans text-[14px]"
							htmlFor="interestRate"
						>
							Interest Rate
						</label>
						<input
							type="number"
							id="interestRate"
							name="interestRate"
							value={interestRate}
							onChange={(e) => setInterestRate(e.target.value)}
							className="w-[619px] mt-2 h-[40px]  p-4 border border-gray-300 bg-white rounded-md text-gray-700 focus:border-gray-800 focus:outline-none placeholder:text-[16px] placeholder:text-[#94A3B8]"
							placeholder="12.5%"
						/>
					</div>

					{/* Loan Term */}
					<div className="mb-6">
						<label
							className="block text-sm text-gray-700 font-sans text-[14px]"
							htmlFor="loanTerm"
						>
							Loan Term
						</label>
						<select
							id="loanTerm"
							name="loanTerm"
							value={loanTerm}
							onChange={(e) => setLoanTerm(e.target.value)}
							className="w-[619px] mt-2 p-4 border border-gray-300 bg-white rounded-md text-gray-700 focus:border-gray-800 focus:outline-none text-[16px]"
						>
							<option value="">Select Loan Term</option>
							<option value="12">12 Months</option>
							<option value="24">24 Months</option>
							<option value="36">36 Months</option>
						</select>
					</div>

					{/* Submit Button */}
					<div className="flex justify-between items-center w-[619px]">
						{/* Back Button */}
						<button className="px-6 py-2 text-gray-800 border-2 border-[#D6DEE0] rounded-[6px] text-[14px] hover:bg-gray-100">
							Back
						</button>

						{/* Continue Button */}
						<button className="flex items-center gap-1 px-6 py-4 text-green-800 bg-white border-2 border-green-800 rounded-[15px] font-[Glowfor] text-[20px]">
							Continue
							<img
								src={rightArrow}
								alt="Right Arrow"
								className="w-[32.29] h-[30.1px]"
							/>
						</button>
					</div>
				</form>
			</div>

			{/* Right side: Green Container */}
			<div className="flex items-center justify-center w-full p-8 text-white bg-green-800 sm:w-1/3">
				<img src={EasyGreenLogo} alt="Easy Green Logo" className="mb-4" />
			</div>
		</div>
	);
};

export default ApplyForLoan;
