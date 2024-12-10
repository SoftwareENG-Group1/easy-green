import React, { useState, useEffect } from "react";

import { pxToViewport } from "../../../../../../utils/viewport";
import walletAdd from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/icons/wallet-add.svg";
import moneyBag from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/icons/money-3.svg";
import walletMinus from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/icons/wallet-minus.svg";
const PaymentHistory = () => {
	// State for dynamic viewport-based values
	const [cardWidth, setCardWidth] = useState(0);
	const [headerPaddingY, setHeaderPaddingY] = useState(0);
	const [headerPaddingX, setHeaderPaddingX] = useState(0);
	// const [itemSpacing, setItemSpacing] = useState(0);
	// const [paddingX, setPaddingX] = useState(0);

	// Calculate viewport-based values on mount and resize
	useEffect(() => {
		const calculateViewportValues = () => {
			setCardWidth(pxToViewport(569, "vw")); // Convert 569px to vw
			setHeaderPaddingY(pxToViewport(9, "vh")); // Convert header padding (12px) to vh
			setHeaderPaddingX(pxToViewport(14, "vw"));
			// setItemSpacing(pxToViewport(16, "vh")); // Convert item spacing (16px) to vh
			// setPaddingX(pxToViewport(16, "vw")); // Convert 16px padding to vw
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	// Sample data for the history
	const paymentHistory = [
		{
			description: "$500 paid on Dec 1, 2024",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
		{
			description: "$300 added to your wallet on Nov 30, 2024.",
			status: "Successful",
			icon: <img src={walletAdd} alt="" style={{}} />,
		},
		{
			description: "$500 paid on Nov 15, 2024",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
		{
			description: "Munachim Arosabo made a payment of 50,000",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
		{
			description: "$200 withdrawn from wallet on Nov 28, 2024",
			status: "Successful",
			icon: <img src={walletMinus} alt="" style={{}} />,
		},
		{
			description: "Munachim Arosabo made a payment of 50,000",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
		{
			description: "Munachim Arosabo made a payment of 50,000",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
		{
			description: "Munachim Arosabo made a payment of 50,000",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
		{
			description: "Munachim Arosabo made a payment of 50,000",
			status: "Successful",
			icon: <img src={moneyBag} alt="" style={{}} />,
		},
	];

	return (
		<div className="flex">
			{/* Card Container */}
			<div
				className="bg-white rounded-[8px] overflow-hidden"
				style={{
					width: `${cardWidth}vw`,
					//padding: `${paddingX}vw`,
				}}
			>
				{/* Header */}
				<div
					className="text-black font-inter font-semibold text-[19px]"
					style={{
						backgroundColor: "#989898",
						paddingTop: `${headerPaddingY}vh`,
						paddingBottom: `${headerPaddingY}vh`,
						paddingLeft: `${headerPaddingX}vw`,
						paddingRight: `${headerPaddingX}vw`,
					}}
				>
					Payment History
				</div>

				{/* Payment History List */}
				<div className="" style={{}}>
					{paymentHistory.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-center py-[10px] px-[14px]"
						>
							{/* Description */}
							<p className="text-black font-inter text-[14px]">
								{item.description}
							</p>

							{/* Status and Icon */}
							<div className="flex items-center space-x-2">
								<span className="text-[#23E233] text-sm font-bold">
									{item.status}
								</span>
								<span className="text-gray-600 text-lg">{item.icon}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PaymentHistory;
