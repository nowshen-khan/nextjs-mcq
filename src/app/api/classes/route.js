import Class from "@/models/Class";
import dbConnect from "@/utils/dbConnect";
export async function GET(req) {
	try {
		await dbConnect();
		const classes = await Class.find().sort({ createdAt: -1 });
		return new Response(JSON.stringify(classes), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: error.message + "Error fetching meta info." }),
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();
		const { name, subjects } = body;
		const existingClass = await Class.findOne({ name });
		if (existingClass) {
			return new Response(JSON.stringify({ message: "Class already exists!" }));
		}
		const newClass = await Class.create({ name, subjects });

		return new Response(
			JSON.stringify({ message: "Class created successfully!", newClass })
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ message: error.message + "Error saving class info." }),
			{ status: 500 }
		);
	}
}
