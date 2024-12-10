import { useEffect, useState } from "react";
import { ContributionComponent } from "./sub-components/ContributionComponent";
import { NextPaymentComponent } from "./sub-components/NextPayment";
import { TipsComponent } from "./sub-components/Tips";
import { pxToViewport } from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/utils/viewport.tsx";
import { LoanBalance } from "./sub-components/LoanBalance";
import PaymentHistory from "./sub-components/PaymentHistory";
import Notifications from "./sub-components/Notifications";
import { Placeholder } from "./sub-components/Placeholder";

const Summary = () => {
	const [marginBottom, setmarginBottom] = useState(0);

	useEffect(() => {
		const calculateViewportValues = () => {
			setmarginBottom(pxToViewport(45, "vh"));
		};
		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	return (
		<div className="w-full flex flex-col ">
			<div
				className=" flex "
				style={{
					marginBottom: `${marginBottom}vh`,
				}}
			>
				<ContributionComponent />
				<NextPaymentComponent />
				<TipsComponent />
			</div>
			<div className="flex">
				<div className="flex flex-col ">
					<LoanBalance />

					<PaymentHistory />
				</div>
				<div className="flex flex-col">
					<Notifications />
					<Placeholder />
				</div>
			</div>
		</div>
	);
};

export default Summary;
