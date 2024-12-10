import React, { useState, useEffect } from "react";
import { pxToViewport } from "../../../../../../utils/viewport";

const Notifications = () => {
	// State for dynamic viewport-based values
	const [cardWidth, setCardWidth] = useState(0);
	const [bottomMargin, setMarginBottom] = useState(0);
	const [headerPaddingY, setHeaderPaddingY] = useState(0);
	const [headerPaddingX, setHeaderPaddingX] = useState(0);
	const [itemPaddingX, setItemPaddingX] = useState(0);
	const [itemPaddingY, setItemPaddingY] = useState(0);

	// Calculate viewport-based values on mount and resize
	useEffect(() => {
		const calculateViewportValues = () => {
			setCardWidth(pxToViewport(503, "vw"));
			setMarginBottom(pxToViewport(32, "vh")); // Convert bottom margin (48px) to vh
			setCardWidth(pxToViewport(503, "vw")); // Convert card width
			setHeaderPaddingY(pxToViewport(9, "vh")); // Convert header padding (12px) to vh
			setHeaderPaddingX(pxToViewport(14, "vw")); // Convert header horizontal padding
			setItemPaddingX(pxToViewport(14, "vw")); // Convert item horizontal padding
			setItemPaddingY(pxToViewport(10, "vh")); // Convert item vertical padding
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	// Sample notification data
	const notifications = [
		"Munachim Arosabo made a payment of 50,000",
		"Your loan payment of $500 was successfully deducted on Dec 1, 2024.",
		"Your next loan payment of $500 is due on Dec 15, 2024",
		"Add funds to ensure timely payment on Dec 15, 2024.",
		"You’ve paid 60% of your loan! Keep it up!",
		"Your last wallet transaction was flagged as successful.",
		"Munachim Arosabo made a payment of 50,000",
		"Munachim Arosabo made a payment of 50,000",
		"Your loan payment schedule has been updated for better convenience.",
		"Munachim Arosabo made a payment of 50,000",
	];

	return (
		<div className="flex">
			{/* Card Container */}
			<div
				className="bg-white rounded-[8px] overflow-hidden"
				style={{
					width: `${cardWidth}vw`,
					marginBottom: `${bottomMargin}vh`,
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
					Notifications
				</div>

				{/* Notifications List */}
				<div className="">
					{notifications.map((notification, index) => (
						<div
							key={index}
							className="py-[10px] px-[14px] border-b last:border-b-0 border-gray-300"
							style={{
								paddingTop: `${itemPaddingY}vh`,
								paddingBottom: `${itemPaddingY}vh`,
								paddingLeft: `${itemPaddingX}vw`,
								paddingRight: `${itemPaddingX}vw`,
							}}
						>
							{/* Notification Text */}
							<p className="text-black font-inter text-[14px]">
								{notification}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Notifications;
