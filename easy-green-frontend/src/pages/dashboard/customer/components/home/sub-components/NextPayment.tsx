import { useEffect, useState } from "react";
import { pxToViewport } from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/utils/viewport.tsx";

export const NextPaymentComponent = () => {
	// State to store viewport values
	const [containerWidth, setContainerWidth] = useState(0);
	const [padding, setPadding] = useState(0);
	const [marginRight, setMarginRight] = useState(0);
	const [marginBottomTitle, setMarginBottomTitle] = useState(0);
	const [marginBottomAmount, setMarginBottomAmount] = useState(0);
	const [marginBottomDueDate, setMarginBottomDueDate] = useState(0);

	// Calculate viewport values on mount and resize
	useEffect(() => {
		const calculateViewportValues = () => {
			setContainerWidth(pxToViewport(309, "vw")); // 309px to vw
			setPadding(pxToViewport(20, "vw")); // 20px to vw
			setMarginRight(pxToViewport(29, "vw")); // 29px to vw
			setMarginBottomTitle(pxToViewport(10, "vh")); // 10px to vw
			setMarginBottomAmount(pxToViewport(8, "vh")); // 8px to vw
			setMarginBottomDueDate(pxToViewport(10, "vh")); // 10px to vw
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	return (
		<div
			className="bg-white flex flex-col rounded-[8px]"
			style={{
				width: `${containerWidth}vw`,
				padding: `${padding}vw`,
				marginRight: `${marginRight}vw`,
			}}
		>
			<p
				className="font-roboto text-[20px] text-black opacity-50"
				style={{
					marginBottom: `${marginBottomTitle}vh`,
				}}
			>
				Next Payment
			</p>
			<p
				className="font-roboto font-semibold text-[34px] text-black"
				style={{
					marginBottom: `${marginBottomAmount}vh`,
				}}
			>
				$300
			</p>
			<p
				className="font-roboto text-[20px] text-black"
				style={{
					marginBottom: `${marginBottomDueDate}vh`,
				}}
			>
				Due on 25th Nov
			</p>
		</div>
	);
};
