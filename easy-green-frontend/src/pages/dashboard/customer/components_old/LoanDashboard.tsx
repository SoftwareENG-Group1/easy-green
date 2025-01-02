import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const LoanDashboard = () => {
  const [nextPayment] = useState({
    amount: 450,
    date: "2025-01-10",
  });
  const [loanBalance] = useState({
    paid: 3000,
    total: 10000,
  });

  const amortizationData = [
    { date: "2024-12-10", payment: "$500.00", balance: "$3000.00" },
    { date: "2024-12-20", payment: "$450.00", balance: "$2550.00" },
    { date: "2025-01-10", payment: "$500.00", balance: "$2050.00" },
    { date: "2025-01-20", payment: "$450.00", balance: "$1600.00" },
    { date: "2025-02-10", payment: "$500.00", balance: "$1100.00" },
    { date: "2025-02-20", payment: "$450.00", balance: "$650.00" },
    { date: "2025-03-10", payment: "$500.00", balance: "$150.00" },
	{ date: "2025-02-20", payment: "$450.00", balance: "$650.00" },
    { date: "2025-03-10", payment: "$500.00", balance: "$150.00" },
	{ date: "2025-02-20", payment: "$450.00", balance: "$650.00" },
    { date: "2025-03-10", payment: "$500.00", balance: "$150.00" },
	{ date: "2025-02-20", payment: "$450.00", balance: "$650.00" },
    { date: "2025-03-10", payment: "$500.00", balance: "$150.00" },
	{ date: "2025-02-20", payment: "$450.00", balance: "$650.00" },
    { date: "2025-03-10", payment: "$500.00", balance: "$150.00" },
    { date: "2025-03-20", payment: "$150.00", balance: "$0.00" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full h-screen bg-[#0F5015] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10  h-[25%]">
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
              completed={(loanBalance.paid / loanBalance.total) * 100} // Calculate progress percentage
              maxCompleted={100} // Progress bar max value set to 100 for percentage
              height="20px"
              bgColor="#0F5015"
              borderRadius="8px"
              customLabel={`${(
                (loanBalance.paid / loanBalance.total) *
                100
              ).toFixed(2)}%`} // Display percentage inside the bar
              labelAlignment="center" // Center the label inside the progress bar
            />
            <div className="flex justify-between mt-2 text-sm text-[#02542D]">
              <p>0</p>
              <p>${loanBalance.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Next Payment Component */}
        <div className="flex justify-between gap-1 p-6 pt-10 bg-white rounded-lg shadow-lg text-slate-900 ">
          <div className="flex flex-col">
            <span className="text-xl text-gray-400">You're next payment for</span>
            <span className="text-5xl font-bold">November</span>
			<span className="text-2xl text-gray-500">{nextPayment.date}</span>
          </div>
          <div className="text-6xl" >${nextPayment.amount}</div>
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
                <td className="px-6 py-3 text-gray-600">{item.date}</td>
                <td className="px-6 py-3 text-gray-600">{item.payment}</td>
                <td className="px-6 py-3 text-gray-600">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanDashboard;
