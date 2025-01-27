// pages/role-setup.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function RoleSetup() {
	const [role, setRole] = useState("");
	const [message, setMessage] = useState("");
	const { data: session } = useSession();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userEmail = session.user.email;
		// Send the role data to the API
		const response = await axios.post("/api/auth/set-role", {
			role,
			userEmail,
		});

		if (response.status === 200) {
			setMessage("Role updated successfully!");
		} else {
			setMessage(response.data.error || "Something went wrong.");
		}
	};

	return (
		<div>
			<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
				<label className="text-lg font-semibold">Select Your Role:</label>
				<select
					value={role}
					onChange={(e) => setRole(e.target.value)}
					className="border p-2 rounded"
					required
				>
					<option value="" disabled>
						Select
					</option>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
				</select>

				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded"
				>
					Submit
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
