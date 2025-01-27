import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { getSession } from "next-auth/react";

dbConnect();

export async function POST(req) {
	await dbConnect();
	const session = await getSession({ req });
	if (!session) {
		return new Response("Not authenticated", { status: 401 });
	}
	const body = await req.json();
	const { password } = body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const userEmail = req.session.user.email;
		const user = await User.findOneAndUpdate(
			{ email: userEmail },
			{ password: hashedPassword },
			{ new: true }
		);

		if (!user) {
			return new Response("User not found", { status: 404 });
		}
		return new Response("Password updated", { status: 200 });
	} catch (error) {
		return new Response(error, { status: 500 });
	}
}
