import dbConnect from "@/utils/dbConnect";
import Source from "@/models/Source";

export async function GET(req) {
	try {
		await dbConnect();
		const sources = await Source.find().sort({ createdAt: -1 });
		return new Response(JSON.stringify(sources), { status: 200 });
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

		const { enName, bnName } = body;
		if (!enName || !bnName) {
			return new Response(
				JSON.stringify({ message: "Both enName and bnName are required." }),
				{ status: 400 }
			);
		}
		const source = new Source(body);
		await source.save();
		console.log(source);
		return new Response(
			JSON.stringify({ message: "Source added successfully!", source }),
			{ status: 201 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ message: error.message }), {
			status: 400,
		});
	}
}
