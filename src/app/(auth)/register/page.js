// pages/register.js
"use client";
import { useState } from "react";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();
		if (res.ok) {
			alert("Registration successful!");
		} else {
			alert(data.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Name"
				value={formData.name}
				onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				required
			/>
			<input
				type="email"
				placeholder="Email"
				value={formData.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={formData.password}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				required
			/>
			<select
				value={formData.role}
				onChange={(e) => setFormData({ ...formData, role: e.target.value })}
			>
				<option value="student">Student</option>
				<option value="instructor">Instructor</option>
			</select>
			<button type="submit">Register</button>
		</form>
	);
}
