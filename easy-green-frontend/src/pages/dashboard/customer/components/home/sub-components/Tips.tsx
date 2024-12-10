import { useEffect, useState } from "react";
import { pxToViewport } from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/utils/viewport.tsx";
export const TipsComponent = () => {
	// State to store viewport values
	const [containerWidth, setContainerWidth] = useState(0);
	const [paddingX, setPaddingX] = useState(0);
	const [paddingY, setPaddingY] = useState(0);
	const [marginBottomTitle, setMarginBottomTitle] = useState(0);
	const [lineHeight, setLineHeight] = useState(0);

	// Calculate viewport values on mount and resize
	useEffect(() => {
		const calculateViewportValues = () => {
			setContainerWidth(pxToViewport(313, "vw")); // 306px to vw
			setPaddingX(pxToViewport(30, "vw")); // 30px to vw
			setPaddingY(pxToViewport(28, "vh")); // 28px to vw
			setMarginBottomTitle(pxToViewport(18, "vh")); // 18px to vw
			setLineHeight(pxToViewport(24, "vh")); // 24px to vw
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
				paddingLeft: `${paddingX}vw`,
				paddingRight: `${paddingX}vw`,
				paddingTop: `${paddingY}vh`,
				paddingBottom: `${paddingY}vh`,
			}}
		>
			<p
				className="font-roboto text-[20px] text-black"
				style={{
					marginBottom: `${marginBottomTitle}vh`,
				}}
			>
				Tips
			</p>
			<p
				className="font-roboto text-[16px] text-black opacity-50"
				style={{
					lineHeight: `${lineHeight}vh`,
				}}
			>
				“Consider increasing your wallet balance for smoother payments.”
			</p>
		</div>
	);
};
