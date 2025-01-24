import { useState } from "react";

export default function SendOTP() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otpSent, setOtpSent] = useState(false);

	const sendOtp = async () => {
		const response = await fetch("/api/send-otp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ phoneNumber }),
		});

		const data = await response.json();
		if (data.success) {
			setOtpSent(true);
			alert("OTP sent to your phone!");
		} else {
			alert("Failed to send OTP: " + data.error);
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
			<button onClick={sendOtp}>Send OTP</button>
			{otpSent && <p>Check your phone for the OTP!</p>}
		</div>
	);
}
