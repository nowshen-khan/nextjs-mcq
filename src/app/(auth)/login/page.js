"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
	getAuth,
	signInWithPhoneNumber,
	RecaptchaVerifier,
} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyBoThGncynPvD4zBUZyx5aqWLQ4vrWnDDM",
	authDomain: "learnwish-2e2e9.firebaseapp.com",
	projectId: "learnwish-2e2e9",
	storageBucket: "learnwish-2e2e9.firebasestorage.app",
	messagingSenderId: "160292989200",
	appId: "1:160292989200:web:da883adbb5ae5281015d95",
	measurementId: "G-8G50QDCSL7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Optional: Initialize Firebase Analytics
let analytics;
if (typeof window !== "undefined") {
	analytics = getAnalytics(app);
}

export default function LoginPage() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const { data: session } = useSession();

	const sendOtp = () => {
		// const validPhoneNumber = /^\+880\d{9}$/;
		// if (!validPhoneNumber.test(phoneNumber)) {
		// 	alert("Please enter a valid phone number in +880 format!");
		// 	return;
		// }
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				"recaptcha-container",
				{ size: "invisible" },
				auth
			);
		}

		const appVerifier = window.recaptchaVerifier;

		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setOtpSent(true);
				alert("OTP sent to your phone!");
			})
			.catch((error) => {
				console.error(error);
				alert("Failed to send OTP: " + error.message);
			});
	};

	const verifyOtp = () => {
		if (!otp) {
			alert("Please enter the OTP!");
			return;
		}
		if (!window.confirmationResult) {
			alert("Please send the OTP first!");
			return;
		}
		window.confirmationResult
			.confirm(otp)
			.then((result) => {
				alert("Login successful!");
				const user = result.user;
				console.log("User:", user);
			})
			.catch((error) => {
				console.error(error);
				alert("Invalid OTP. Try again.");
			});
	};

	if (session) {
		return (
			<div>
				<h1>Welcome, {session.user.name}</h1>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		);
	}

	return (
		<div
			style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
		>
			<h2>Login</h2>
			{/* Phone Login */}
			{/* {!otpSent ? (
				<div>
					<input
						type="text"
						placeholder="Enter your phone number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
					/>{" "}
					<div id="recaptcha-container"></div>
					<button
						onClick={sendOtp}
						style={{
							width: "100%",
							padding: "10px",
							backgroundColor: "#007BFF",
							color: "white",
							border: "none",
							borderRadius: "5px",
						}}
					>
						Send OTP
					</button>
				</div>
			) : (
				<div>
					<input
						type="text"
						placeholder="Enter OTP"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
					/>
					<button
						onClick={verifyOtp}
						style={{
							width: "100%",
							padding: "10px",
							backgroundColor: "#28A745",
							color: "white",
							border: "none",
							borderRadius: "5px",
						}}
					>
						Verify OTP
					</button>
				</div>
			)} */}
			<div style={{ margin: "20px 0" }}>
				{/* <p>Or login with:</p> */}
				<button
					onClick={() => signIn("google")}
					style={{
						width: "100%",
						padding: "10px",
						backgroundColor: "#DB4437",
						color: "white",
						border: "none",
						borderRadius: "5px",
						marginBottom: "10px",
					}}
				>
					Login with Google
				</button>
				<button
					onClick={() => signIn("facebook")}
					style={{
						width: "100%",
						padding: "10px",
						backgroundColor: "#4267B2",
						color: "white",
						border: "none",
						borderRadius: "5px",
					}}
				>
					Login with Facebook
				</button>
			</div>
		</div>
	);
}
