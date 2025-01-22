import dbConnect from "@/utils/dbConnect";
import Exam from "@/models/Exam";

export async function GET(req) {
	try {
		await dbConnect();
		const exams = await Exam.find().sort({ createdAt: -1 });
		return new Response(JSON.stringify(exams), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: error.message }), {
			status: 500,
		});
	}
}

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();
		const exam = new Exam(body);
		await exam.save();
		console.log(exam);
		return new Response(
			JSON.stringify({ message: "Exam added successfully!", exam }),
			{ status: 201 }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message || "Failed to add exam" }),
			{
				status: 500,
			}
		);
	}
}
