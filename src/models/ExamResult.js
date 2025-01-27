import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema(
	{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		exam: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CreateExam",
			required: true,
		},
		score: { type: Number, required: true },
		answers: [
			{
				question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
				selectedOption: Number,
				isCorrect: Boolean,
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.models.ExamResult ||
	mongoose.model("ExamResult", examResultSchema);
