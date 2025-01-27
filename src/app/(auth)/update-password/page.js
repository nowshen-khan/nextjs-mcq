// pages/update-password.js
"use client";
import { useState } from "react";

export default function UpdatePassword() {
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/auth/update-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password }),
		});

		if (res.ok) {
			alert("Password updated successfully!");
		} else {
			alert("Failed to update password");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Set Your Password</h2>
			<input
				type="password"
				placeholder="Enter new password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Set Password</button>
		</form>
	);
}
