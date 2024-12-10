import { SideBar } from "./components_old/SideBar.tsx";
import Summary from "./components/home/Summary.tsx";
import { useState, useEffect } from "react";
import { pxToViewport } from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/utils/viewport.tsx";

const UserDashboard = () => {
	// State to store viewport-based values
	const [mainContentWidth, setMainContentWidth] = useState(0);
	const [mainContentPadding, setMainContentPadding] = useState(0);
	const [paddingY, setPaddingY] = useState(0);

	// Calculate viewport-based values on mount and resize
	useEffect(() => {
		const calculateViewportValues = () => {
			setMainContentWidth(pxToViewport(1512, "vw")); // Equivalent to 79.42vw
			setMainContentPadding(pxToViewport(72, "vw"));
			setPaddingY(pxToViewport(70, "vh")); // Equivalent to 5.83vw
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	return (
		<div
			className="flex min-h-screen bg-[#0F5015]"
			style={{
				width: `${mainContentWidth}vw`,
			}}
		>
			{/* Sidebar */}
			<SideBar />

			{/* Main Content */}
			<div className="w-full flex justify-center">
				<div
					className=""
					style={{
						paddingTop: `${paddingY}vh`,
						paddingBottom: `${paddingY}vh`,
						paddingLeft: `${mainContentPadding}vw`,
						paddingRight: `${mainContentPadding}vw`,
					}}
				>
					<Summary />
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
