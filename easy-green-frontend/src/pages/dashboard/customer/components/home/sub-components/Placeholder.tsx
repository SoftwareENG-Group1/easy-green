import { useEffect, useState } from "react";
import { pxToViewport } from "../../../../../../utils/viewport";

export const Placeholder = () => {
	const [containerWidth, setContainerWidth] = useState(0);
	const [containerHeight, setContainerHeight] = useState(0);

	useEffect(() => {
		const calculateViewportValues = () => {
			// Container dimensions
			setContainerWidth(pxToViewport(503, "vw"));
			setContainerHeight(pxToViewport(156, "vh"));

			// Adjusted to scale vertically
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	return (
		<div
			className="bg-white rounded-[8px]"
			style={{
				width: `${containerWidth}vw`,
				height: `${containerHeight}vh`,
			}}
		></div>
	);
};
