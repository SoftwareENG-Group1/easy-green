import React, { useEffect, useState } from "react";
import EasyGreenLogo from "/Users/jeffreybenson/Documents/React/React Project/loan-amortization-frontend/src/assets/images/logo.svg";
import { pxToViewport } from "../utils/viewport";
import { loginUser } from "../api/auth_api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccessMessage("");
		if (!email || !password) {
			setError("Both fields are required");
		} else {
			console.log("");
			try {
				const response = await loginUser(email, password);
				const { accessToken, refreshToken } = response;

				//store tokens in local storage
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);

				setSuccessMessage("Login successful! Redirecting...");
				setTimeout(() => {
					navigate("/user-dashboard");
				}, 1000);
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					setError(error.message);
					// Access response data from the AxiosError
					throw new Error(
						error.response?.data?.message || "An error occurred during login."
					);
				} else {
					// For any other errors that are not AxiosError
					throw new Error("An unknown error occurred during login.");
				}
			} finally {
				setLoading(false);
			}
		}
	};

	const [greenContainerWidth, setGreenContainerWidth] = useState(0);
	const [textFieldWidth, setTextFieldWidth] = useState(0);
	const [paddingLeft, setPaddingLeft] = useState(0);

	useEffect(() => {
		const calculateViewportValues = () => {
			// Container dimensions
			setGreenContainerWidth(pxToViewport(511, "vw"));
			setTextFieldWidth(pxToViewport(488, "vw"));
			setPaddingLeft(pxToViewport(260, "vw"));
		};

		calculateViewportValues();
		window.addEventListener("resize", calculateViewportValues);

		return () => window.removeEventListener("resize", calculateViewportValues);
	}, []);

	return (
		<div className="flex min-h-screen bg-white">
			{/*Left side: Form */}
			<div
				className="w-full flex flex-col justify-center mb-[8px]"
				style={{
					paddingLeft: `${paddingLeft}vw`,
				}}
			>
				<h2 className="text-black text-[48px] font-[Glowfor]">Sign In</h2>
				<p className="text-black text-[16px] font-inter mb-[48px]">
					Enter your credentials to access your account
				</p>
				{error && <div className="text-red-500 mb-4">{error}</div>}

				<form onSubmit={handleLogin} className="w-full">
					<div className="mb-[24px]">
						<label
							className="block text-black font-inter text-[14px]"
							htmlFor="email"
						>
							Email
						</label>

						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-[8px] p-4 border border-gray-300 bg-white rounded-[5px] text-black focus:border-black focus:outline-none"
							style={{ width: `${textFieldWidth}vw` }}
						/>
					</div>

					<div className="mb-[8px]">
						<label
							className="block text-black font-inter text-[14px]"
							htmlFor="password"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-[8px] p-4 border border-gray-300 bg-white rounded-[5px] text-black focus:border-black focus:outline-none"
							style={{ width: `${textFieldWidth}vw` }}
						/>
					</div>

					<div className="mb-6">
						{/* Forgot Password Link */}
						<div
							className="flex justify-end mb-[48px]"
							style={{ width: `${textFieldWidth}vw` }}
						>
							<a href="#" className="text-[#114411] font-bold font-inter">
								Forgot Password?
							</a>
						</div>

						{/* Sign In Button */}
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-4 bg-black text-white text-[16px] rounded-[5px] hover:bg-gray-700 font-[Glowfor]"
							style={{ width: `${textFieldWidth}vw` }}
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</div>

					<div
						className="flex justify-start text-center"
						style={{ width: `${textFieldWidth}vw` }}
					>
						<span className="font-inter text-[16px] text-black">
							Don't have an account?{" "}
							<a href="#" className="text-[#114411] font-bold">
								Create now
							</a>
						</span>
					</div>
				</form>
			</div>
			{/*Right side: Green Container */}
			<div
				className="flex justify-center bg-[#114411]"
				style={{ width: `${greenContainerWidth}vw` }}
			>
				<img src={EasyGreenLogo} alt="Easy Green Logo" className="w-[311px]" />
			</div>
		</div>
	);
};

export default Login;
