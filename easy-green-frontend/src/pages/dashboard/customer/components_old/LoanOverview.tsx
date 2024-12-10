import React, { useState } from "react";
import ProfileImage from "/Users/jeffreybenson/Documents/React/React Project/easy-green/easy-green-frontend/src/assets/images/user-square.png"; // Replace with your actual profile image
import { FiSettings } from "react-icons/fi"; // Import settings icon from react-icons
import LoanDashboard from "./LoanDashboard";

const LoanOverview = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [profileCompletion, setProfileCompletion] = useState(75); // Profile completion in percentage

	return (
		<div className="space-x-4 p-6 bg-white shadow-md rounded-lg">
			<div className="flex items-center space-x-4">
				{/* Profile Picture */}
				<div className="w-[62px] h-[62px] rounded-lg overflow-hidden border-2 border-gray-300">
					<img
						src={ProfileImage}
						alt="Profile"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Profile Info */}
				<div className="flex flex-col">
					<div className="flex items-center space-x-2">
						<h2 className="text-[24px] font-[Glowfor] text-[#0F5015]">
							Good Afternoon, Helen
						</h2>
						<FiSettings className="text-gray-500 cursor-pointer" />
					</div>

					{/* Progress Bar */}
					<div className="flex items-center mt-2 space-x-2">
						<div className="w-[215px] bg-gray-300 rounded-none h-2">
							<div
								className="bg-[#0F5015] h-2 rounded-full"
								style={{ width: `${profileCompletion}%` }}
							></div>
						</div>
						<span className="italic text-[8px] text-[#0F5015] opacity-65">
							{profileCompletion}% Profile Completion Status
						</span>
					</div>

					{/* Profile Completion Status */}
				</div>
			</div>
			
			<LoanDashboard />
		</div>
	);
};

export default LoanOverview;
