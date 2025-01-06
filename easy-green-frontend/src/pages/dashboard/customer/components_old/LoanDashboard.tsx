import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { createMonthlyPayments } from "../api/api";
import { LoanPayment } from "./interfaces";

export const populateMonthlyPayments = async (): Promise<LoanPayment[]> => {
	try {
		const loanId = "12345"; // Replace with the actual loan ID
		const paymentData = {
			paymentId: "98765", // Unique payment ID
			loanId: loanId, // Reference the same loan ID
			amountPaid: 1000, // Amount paid
			paymentDate: new Date().toISOString(), // Current date-time in ISO format
		};

		const response = await createMonthlyPayments(loanId, paymentData);
		console.log("Monthly Payments Response:", response.data); // Handle the response
		return response.data as LoanPayment[];
	} catch (error) {
		console.error("Error fetching monthly payments:", error);
		return [];
	}
};

const LoanDashboard = () => {
	const [amortizationData, setAmortizationData] = useState<LoanPayment[]>([]);

	useEffect(() => {
		const fetchPayments = async () => {
			const payments = await populateMonthlyPayments();
			setAmortizationData(payments);
		};
		fetchPayments();
	}, []);
	const [loanBalance] = useState({
		paid: 3000,
		total: 10000,
	});
	const [nextPayment] = useState({
		amount: 450,
		date: "2025-01-10",
	});

	return (
		<div className="flex flex-col gap-6 w-full h-screen bg-[#0F5015] p-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 h-[25%]">
				<div className="p-6 bg-white rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold text-black">Loan Balance</h2>
					<div className="flex flex-col mt-2 space-y-2">
						<div className="text-4xl font-semibold text-[#356639]">
							${loanBalance.paid.toFixed(2)} / ${loanBalance.total.toFixed(2)}
						</div>
					</div>
					<div className="mt-2">
						<h3 className="text-lg text-gray-700">Loan Progress</h3>
						<ProgressBar
							completed={(loanBalance.paid / loanBalance.total) * 100}
							maxCompleted={100}
							height="20px"
							bgColor="#0F5015"
							borderRadius="8px"
							customLabel={`${(
								(loanBalance.paid / loanBalance.total) *
								100
							).toFixed(2)}%`}
							labelAlignment="center"
						/>
						<div className="flex justify-between mt-2 text-sm text-[#02542D]">
							<p>0</p>
							<p>${loanBalance.total.toFixed(2)}</p>
						</div>
					</div>
				</div>

				{/* Next Payment Component */}
				<div className="flex justify-between gap-1 p-6 pt-10 bg-white rounded-lg shadow-lg text-slate-900">
					<div className="flex flex-col">
						<span className="text-xl text-gray-400">Your next payment for</span>
						<span className="text-5xl font-bold">November</span>
						<span className="text-2xl text-gray-500">{nextPayment.date}</span>
					</div>
					<div className="text-6xl">${nextPayment.amount}</div>
				</div>
			</div>

			{/* Bottom Row (Loan Amortization Schedule) */}
			<div className="p-8 bg-white rounded-lg shadow-lg h-[75%] overflow-y-auto">
				<h2 className="text-2xl font-semibold text-black">
					Loan Amortization Schedule
				</h2>
				{/* Table */}
				<table className="min-w-full mt-6 text-sm table-auto">
					<thead>
						<tr className="text-left text-gray-700 border-b">
							<th className="px-6 py-3">Date</th>
							<th className="px-6 py-3">Payment</th>
							<th className="px-6 py-3">Balance</th>
						</tr>
					</thead>
					<tbody>
						{amortizationData.map((item, index) => (
							<tr key={index} className="border-b hover:bg-gray-50">
								<td className="px-6 py-3 text-gray-600">
									{new Date(item.paymentDate).toLocaleDateString()}
								</td>
								<td className="px-6 py-3 text-gray-600">
									${item.amountPaid.toFixed(2)}
								</td>
								<td className="px-6 py-3 text-gray-600">
									${item.principal.toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LoanDashboard;
