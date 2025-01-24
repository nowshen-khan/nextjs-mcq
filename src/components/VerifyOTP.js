import { useState } from "react";

export default function VerifyOTP() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");

	const verifyOtp = async () => {
		const response = await fetch("/api/verify-otp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ phoneNumber, otp }),
		});

		const data = await response.json();
		if (data.success) {
			alert("OTP verified! Login successful.");
		} else {
			alert("Invalid OTP. Try again.");
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Enter your phone number"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Enter OTP"
				value={otp}
				onChange={(e) => setOtp(e.target.value)}
			/>
			<button onClick={verifyOtp}>Verify OTP</button>
		</div>
	);
}
