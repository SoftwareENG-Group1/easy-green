import { pxToViewport } from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/utils/viewport.tsx";
import walletAdd from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/icons/wallet-add.svg";
import walletMinus from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/icons/wallet-minus.svg";
import { useEffect, useState } from "react";

export const ContributionComponent = () => {
	// State to store viewport values
	const [containerWidth, setContainerWidth] = useState(0);
	const [padding, setPadding] = useState(0);
	const [marginRight, setMarginRight] = useState(0);
	const [marginBottomTitle, setMarginBottomTitle] = useState(0);
	const [marginBottomAmount, setMarginBottomAmount] = useState(0);
	const [buttonPaddingX, setButtonPaddingX] = useState(0);
	const [buttonPaddingY, setButtonPaddingY] = useState(0);
	const [buttonIconMargin, setButtonIconMargin] = useState(0);
	const [textLineHeight, setTextLineHeight] = useState(0);

	// Calculate viewport values on component mount and window resize
	useEffect(() => {
		const calculateViewportValues = () => {
			// Container dimensions
			setContainerWidth(pxToViewport(433, "vw"));
			setPadding(pxToViewport(20, "vw"));
			setMarginRight(pxToViewport(29, "vw"));

			// Margins for elements
			setMarginBottomTitle(pxToViewport(10, "vw"));
			setMarginBottomAmount(pxToViewport(8, "vw"));

			// Button dimensions
			setButtonPaddingX(pxToViewport(10, "vw"));
			setButtonPaddingY(pxToViewport(2, "vw"));
			setButtonIconMargin(pxToViewport(10, "vw"));

			// Text line height
			setTextLineHeight(pxToViewport(28, "vh")); // Adjusted to scale vertically
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
					marginBottom: `${marginBottomTitle}vw`,
				}}
			>
				Contribution
			</p>
			<p
				className="font-roboto font-semibold text-[34px] text-black"
				style={{
					marginBottom: `${marginBottomAmount}vw`,
				}}
			>
				$5000
			</p>
			<div className="flex justify-between">
				<div
					className="bg-[#C2EAC3] flex rounded-[4px]"
					style={{
						paddingLeft: `${buttonPaddingX}vw`,
						paddingRight: `${buttonPaddingX}vw`,
						paddingTop: `${buttonPaddingY}vw`,
						paddingBottom: `${buttonPaddingY}vw`,
					}}
				>
					<img
						src={walletAdd}
						alt=""
						style={{
							marginRight: `${buttonIconMargin}vw`,
						}}
					/>
					<p
						className="font-roboto text-[12px] text-black"
						style={{
							lineHeight: `${textLineHeight}vh`,
						}}
					>
						Add Money
					</p>
				</div>
				<div
					className="bg-[#EAC7C3] flex rounded-[4px]"
					style={{
						paddingLeft: `${buttonPaddingX}vw`,
						paddingRight: `${buttonPaddingX}vw`,
						paddingTop: `${buttonPaddingY}vw`,
						paddingBottom: `${buttonPaddingY}vw`,
					}}
				>
					<img
						src={walletMinus}
						alt=""
						style={{
							marginRight: `${buttonIconMargin}vw`,
						}}
					/>
					<p
						className="font-roboto text-[12px] text-black"
						style={{
							lineHeight: `${textLineHeight}vh`,
						}}
					>
						Withdraw Money
					</p>
				</div>
			</div>
		</div>
	);
};
