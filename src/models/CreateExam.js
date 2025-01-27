import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // অ্যাডমিন বা ইনস্ট্রাক্টর
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // পরীক্ষায় অংশগ্রহণকারী স্টুডেন্ট
	},
	{ timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("CreateExam", examSchema);
