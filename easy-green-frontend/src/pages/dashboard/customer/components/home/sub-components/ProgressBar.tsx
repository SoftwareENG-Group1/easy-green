import React, { useEffect, useState } from "react";
import { pxToViewport } from "../../../../../../utils/viewport";

interface ProgressBarProps {
	percentage: number; // Define the type for the percentage prop
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
	const [progressBarHeight, setProgressBarHeight] = useState(0);

	useEffect(() => {
		const calculateViewportValues = () => {
			setProgressBarHeight(pxToViewport(16, "vh")); // 309px to vw
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);
	return (
		<div className="flex items-center">
			<div
				className="relative w-full bg-[#737373] rounded-full overflow-hidden"
				style={{
					height: `${progressBarHeight}vh`,
				}}
			>
				<div
					className="absolute left-0 top-0 h-full bg-[#39E060]"
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
