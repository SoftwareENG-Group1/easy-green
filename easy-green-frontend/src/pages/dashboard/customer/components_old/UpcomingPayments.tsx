import React from "react";

const UpcomingPayments = () => {
	const paymentsData = [
		{
			clientName: "Munachim Arosabo",
			loanAmount: "$550.00",
			balance: "$255.00",
			nextPaymentDate: "12-11-2024",
			loanStatus: "Paid",
		},
		{
			clientName: "Munachim Arosabo",
			loanAmount: "$550.00",
			balance: "$255.00",
			nextPaymentDate: "12-11-2024",
			loanStatus: "Paid",
		},
		{
			clientName: "Munachim Arosabo",
			loanAmount: "$550.00",
			balance: "$255.00",
			nextPaymentDate: "12-11-2024",
			loanStatus: "Pending",
		},
		{
			clientName: "Munachim Arosabo",
			loanAmount: "$550.00",
			balance: "$255.00",
			nextPaymentDate: "12-11-2024",
			loanStatus: "Pending",
		},
		{
			clientName: "Munachim Arosabo",
			loanAmount: "$550.00",
			balance: "$255.00",
			nextPaymentDate: "12-11-2024",
			loanStatus: "Paid",
		},
	];

	return (
		<div className="bg-[#D9D9D9] p-[0px] rounded-tl-[15px] rounded-tr-[15px] border border-solid border-[#000000] w-full">
            <div className="h-[20px]"></div>
			<h2 className="text-[16px] font-semibold text-green-800 pl-[15px]">
				Upcoming Payments
			</h2>
			<table className="min-w-full mt-6 table-auto border-solid">
				<thead className="bg-[#D9D9D9] ">
					<tr>
						<th className="px-4 py-2 text-left text-[7px] font-semibold text-gray-700">
							Client Name
						</th>
						<th className="px-4 py-2 text-left text-[7px] font-semibold  text-gray-700">
							Loan Amount
						</th>
						<th className="px-4 py-2 text-left text-[7px] font-semibold text-gray-700">
							Balance
						</th>
						<th className="px-4 py-2 text-left text-[7px] font-semibold  text-gray-700">
							Next Payment Date
						</th>
						<th className="px-4 py-2 text-left text-[7px] font-semibold  text-gray-700">
							Loan Status
						</th>
					</tr>
				</thead>
				<tbody className="bg-white ">
					{paymentsData.map((payment, index) => (
						<tr key={index} className=" even:bg-[#F9FAF9]">
							<td className="px-4 py-2 text-[7px] font-semibold text-gray-700">
								{payment.clientName}
							</td>
							<td className="px-4 py-2 text-[7px] font-semibold  text-gray-700">
								{payment.loanAmount}
							</td>
							<td className="px-4 py-2 text-[7px] font-semibold  text-gray-700">
								{payment.balance}
							</td>
							<td className="px-4 py-2 text-[7px] font-semibold text-gray-700">
								{payment.nextPaymentDate}
							</td>
							<td className="px-4 py-2 text-[7px] font-semibold  text-gray-700">
								<span
									className={
										payment.loanStatus === "Paid"
											? "text-green-500"
											: "text-yellow-500"
									}
								>
									{payment.loanStatus}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UpcomingPayments;
