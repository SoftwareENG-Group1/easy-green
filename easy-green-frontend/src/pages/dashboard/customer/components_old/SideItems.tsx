import React, { useState } from "react";
import HomeIcon from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/icons/home-2.svg";
const SideItems = () => {
	const [activeItem, setActiveItem] = useState("Home");

	const handleClick = (item: string) => {
		setActiveItem(item);
	};

	return (
		<div className="flex flex-col h-full justify-between">
			<div>
				{/* Home */}
				<div
					className={`flex gap-[8px] px-[8px] py-[4px] rounded-[11px] mb-[16px] cursor-pointer ${
						activeItem === "Home"
							? "bg-gray-200 text-black font-[roboto] font-semibold text-[16px]"
							: "text-gray-600 font-[roboto]"
					}`}
					onClick={() => handleClick("Home")}
				>
					<img src={HomeIcon} alt="" className="" />
					<span className="">Home</span>
				</div>
				{/* Loan Overview */}
				<div
					className={`flex gap-[8px] px-[8px] py-[4px] rounded-[11px] mb-[16px] cursor-pointer ${
						activeItem === "Loan Overview"
							? "bg-gray-200 text-black font-[roboto] font-semibold text-[16px]"
							: "text-gray-600 font-[roboto] text-[14px] "
					}`}
					onClick={() => handleClick("Loan Overview")}
				>
					<img src={HomeIcon} alt="" className="" />
					Loan Overview
				</div>
				{/* Payment History */}
				<div
					className={`flex gap-[8px] px-[8px] py-[4px] rounded-[11px] mb-[16px] cursor-pointer ${
						activeItem === "Payment History"
							? "bg-gray-200 text-black font-[roboto] font-semibold text-[16px]"
							: "text-gray-600 font-[roboto] text-[14px]"
					}`}
					onClick={() => handleClick("Payment History")}
				>
					<img src={HomeIcon} alt="" className="" />
					Payment History
				</div>
				{/* Settings */}
				<div
					className={`flex gap-[8px] px-[8px] py-[4px] rounded-[11px]  mb-[16px]  cursor-pointer ${
						activeItem === "Settings"
							? "bg-gray-200 text-black font-[roboto] font-semibold text-[16px]"
							: "text-gray-600 font-[roboto] text-[14px]"
					}`}
					onClick={() => handleClick("Settings")}
				>
					<img src={HomeIcon} alt="" className="" />
					Settings
				</div>
			</div>
			{/* Help Support */}
			<div
				className={`flex justify-center px-[8px] py-[4px] rounded-[11px] cursor-pointer ${
					activeItem === "Help Support"
						? "bg-gray-200 text-black font-[roboto] font-semibold text-[16px]"
						: "text-gray-600 font-[roboto] text-[14px]"
				}`}
				onClick={() => handleClick("Help Support")}
			>
				Help Support
			</div>
		</div>
	);
};

export default SideItems;
