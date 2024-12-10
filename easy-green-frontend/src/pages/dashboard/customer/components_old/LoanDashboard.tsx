import React from "react";
import UpcomingPayments from "./UpcomingPayments";

const LoanDashboard = () => {
	return (
		<div className="flex w-full mt-[20px]">
			{/* Loan Overview Section */}
			<div className="flex w-1/2 bg-[#ECF1EC] p-[15px] rounded-[7.5px] border-2 border-black">
				<div className="w-1/2">
					<h2 className="text-[24px] text-black font-[Glowfor]">
						Loan Overview
					</h2>
					<div className="h-[20px]"></div>
					{/* Loan Balance */}
					<div className="flex flex-col rounded-[15px] p-[15px] items-start space-y-2 border-[1px] border-black">
						<h3 className="text-[16px] text-black font-[Glowfor]">
							Loan Balance
						</h3>
						<div className=" text-[24px] text-[#356639] ">$3,530.24</div>
					</div>
					<div className="h-[20px]"></div>
					{/* Loan Progress */}
					<div className="flex flex-col rounded-[15px] p-[15px] items-start space-y-2 border-[1px] border-black">
						<h3 className="text-[16px] text-black font-[Glowfor]">
							Loan Progress
						</h3>

						{/* Progress Bar */}
						<div className="flex items-center mt-2 space-x-2">
							<div className="w-[215px] bg-gray-300 rounded-none h-2">
								<div
									className="bg-[#0F5015] h-2 rounded-full"
									style={{ width: 75 }}
								></div>
							</div>
						</div>
						<div className="flex justify-between w-[215px] ">
							<p className="text-[#02542D]">0</p>
							<p className="text-[#02542D]">$18426.41</p>
						</div>
					</div>
					<div className="h-[15px]"></div>
					<div className=" w-[215px] bg-green justify-center items-center">
						<button className="flex items-center gap-1 px-6 py-4 text-green-800 bg-white border-[1px] border-green-800 rounded-[15px] font-[Glowfor] text-[20px]">
							Apply For Loan
						</button>
					</div>
				</div>
				<div className="w-1/2 ml-[20px]">
					<UpcomingPayments />
				</div>
			</div>
			<div className="ml-[20px] flex flex-col w-1/2">
				<div className=" mb-[25px] h-[152px] border-[2px] border-black rounded-[15px]"></div>
				<div className="  bg-[#ECF1EC] h-[282px] border-[2px] border-black rounded-[15px]"></div>
			</div>
		</div>
	);
};

export default LoanDashboard;
