import MetaInfo from "@/models/MetaInfo";
import dbConnect from "@/utils/dbConnect";
export async function GET(req) {
	try {
		await dbConnect();
		const metaInfos = await MetaInfo.find().sort({ createdAt: -1 });
		return new Response(JSON.stringify(metaInfos), { status: 200 });
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
		const metaInfo = new MetaInfo(body);
		await metaInfo.save();

		return new Response(
			JSON.stringify({ message: "MetaInfo added successfully!", metaInfo }),
			{ status: 201 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ message: error.message }), {
			status: 400,
		});
	}
}
