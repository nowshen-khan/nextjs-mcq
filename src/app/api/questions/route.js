import dbConnect from "@/utils/dbConnect";
import Question from "@/models/Question";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();
		const question = new Question(body);
		await question.save();
		return new Response(
			JSON.stringify({ message: "Question added successfully!", question }),
			{ status: 201 }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message || "Failed to add question" }),
			{
				status: 500,
			}
		);
	}
}
