import React, { useState } from "react";
import EasyGreenLogo from "../../../assets/images/Easy-Green.png";
import { loginUser } from "./api/auth_api";
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
			try {
				const response = await loginUser(email, password);
				const { accessToken, refreshToken } = response;
				console.log(accessToken)
				// Store tokens in local storage
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);

				setSuccessMessage("Login successful! Redirecting...");
				setTimeout(() => {
					navigate("/admin/");
				}, 1000);
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					setError(error.message);
					throw new Error(
						error.response?.data?.message || "An error occurred during login."
					);
				} else {
					throw new Error("An unknown error occurred during login.");
				}
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="flex min-h-screen bg-white">
			<div className="flex flex-col justify-center w-full px-10 lg:px-32">
				<h2 className="mb-2 text-4xl text-black font-[Glowfor] px-[20%]">Sign In</h2>
				<p className="mb-12 text-sm text-black font-inter px-[20%]">
					Enter your credentials to access your account
				</p>
				{error && <div className="mb-4 text-red-500">{error}</div>}

				<form onSubmit={handleLogin} className="space-y-6 px-[20%]">
					<div>
						<label
							htmlFor="email"
							className="block text-sm text-black font-inter"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-4 mt-2 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm text-black font-inter"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-4 mt-2 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
						/>
					</div>

					<div className="text-right">
						<a
							href="#"
							className="text-sm font-bold text-[#114411] font-inter"
						>
							Forgot Password?
						</a>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-4 text-sm text-white bg-black rounded-md font-[Glowfor] hover:bg-[#114411]"
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>

					<div className="text-center">
						<span className="text-sm text-black font-inter">
							Don't have an account?{" "}
							<a href="/create-account" className="font-bold text-[#114411]">
								Create now
							</a>
						</span>
					</div>
				</form>
			</div>

			<div className="flex bg-[#114411] justify-center items-center">
				<img
					src={EasyGreenLogo}
					alt="Easy Green Logo"
				/>
			</div>
		</div>
	);
};

export default Login;