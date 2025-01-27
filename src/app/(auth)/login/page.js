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

	const { data: session } = useSession();

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

			<div style={{ margin: "20px 0" }}>
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
