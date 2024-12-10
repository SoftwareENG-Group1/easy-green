import SideItems from "./SideItems";
import EasyGreenLogo from "/Users/jeffreybenson/Documents/React/React Project/loan-amortization-frontend/src/assets/images/logo.svg";
import { pxToViewport } from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/utils/viewport.tsx";
import { useState, useEffect } from "react";

export const SideBar = () => {
	// State for viewport-based values
	const [sidebarWidth, setSidebarWidth] = useState(0);
	const [paddingX, setPaddingX] = useState(0);
	const [paddingY, setPaddingY] = useState(0);
	const [spacerTop, setSpacerTop] = useState(0);
	const [spacerBetween, setSpacerBetween] = useState(0);

	// Calculate viewport-based values on mount and resize
	useEffect(() => {
		const calculateViewportValues = () => {
			setSidebarWidth(pxToViewport(254, "vw")); // 254px to vw
			setPaddingX(pxToViewport(27, "vw")); // 27px to vw
			setPaddingY(pxToViewport(40, "vh")); // 40px to vh
			setSpacerTop(pxToViewport(10, "vh")); // 10px to vh
			setSpacerBetween(pxToViewport(33, "vh")); // 33px to vh
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	return (
		<div
			className="flex flex-col bg-white text-white"
			style={{
				width: `${sidebarWidth}vw`,
				paddingLeft: `${paddingX}vw`,
				paddingRight: `${paddingX}vw`,
				paddingTop: `${paddingY}vh`,
				paddingBottom: `${paddingY}vh`,
			}}
		>
			<div
				style={{
					height: `${spacerTop}vh`,
				}}
			></div>
			<img src={EasyGreenLogo} alt="Easy Green Logo" />
			<div
				style={{
					height: `${spacerBetween}vh`,
				}}
			></div>
			{/* Side Items */}
			<SideItems />
		</div>
	);
};
