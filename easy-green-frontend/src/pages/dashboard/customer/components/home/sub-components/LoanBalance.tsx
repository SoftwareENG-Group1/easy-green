import { useEffect, useState } from "react";
import { pxToViewport } from "../../../../../../utils/viewport";
import ProgressBar from "@ramonak/react-progress-bar";

export const LoanBalance = () => {
	const [containerWidth, setContainerWidth] = useState(0);
	const [padding, setPadding] = useState(0);
	const [marginRight, setMarginRight] = useState(0);
	const [marginBottomTitle, setMarginBottomTitle] = useState(0);
	const [marginBottomAmount, setMarginBottomAmount] = useState(0);
    const [marginBottom, setMarginBottom] = useState(0);
	const [loanBalance] = useState({
		paid: 3000,
		total: 10000,
	  });

	useEffect(() => {
		const calculateViewportValues = () => {
			// Container dimensions
			setContainerWidth(pxToViewport(569, "vw"));
			setPadding(pxToViewport(20, "vw"));
			setMarginRight(pxToViewport(40, "vw"));

			// Margins for elements
			setMarginBottomTitle(pxToViewport(7, "vh"));
			setMarginBottomAmount(pxToViewport(7, "vh"));
            setMarginBottom(pxToViewport(30, "vh")); // Adjusted to vertically center the progress bar

            // // Progress bar dimensions

			// // Button dimensions
			// setButtonPaddingX(pxToViewport(10, "vw"));
			// setButtonPaddingY(pxToViewport(2, "vw"));
			// setButtonIconMargin(pxToViewport(10, "vw"));

			// // Text line height
			// setTextLineHeight(pxToViewport(28, "vh")); // Adjusted to scale vertically
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
                marginBottom: `${marginBottom}vh`, // Adjusted to vertically center the progress bar
			}}
		>
			<p
				className="font-roboto text-[20px] text-black opacity-50"
				style={{
					marginBottom: `${marginBottomTitle}vh`,
				}}
			>
				Loan Balance
			</p>
			<p
				className="font-roboto font-semibold text-[34px] text-black"
				style={{
					marginBottom: `${marginBottomAmount}vh`,
				}}
			>
				${loanBalance.paid}/${loanBalance.total}
			</p>
			<div className="flex justify-end">
				<p className="font-roboto font-semibold text-[16px] text-black ">{(loanBalance.paid / loanBalance.total) * 100}%</p>
			</div>
			<ProgressBar
			completed={(loanBalance.paid / loanBalance.total) * 100} 
			height="20px"
			bgColor="#0F5015"
			borderRadius="8px"
			isLabelVisible={false}
			/>
		</div>
	);
};
