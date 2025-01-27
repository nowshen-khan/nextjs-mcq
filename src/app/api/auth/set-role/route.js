// pages/api/set-role.js
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(request) {
	try {
		const body = await request.json();

		const { role, userEmail } = body;

		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}
		user.role = role;
		await user.save();

		return NextResponse.json(
			{ message: "Role updated successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong." },
			{ status: 500 }
		);
	}
}
