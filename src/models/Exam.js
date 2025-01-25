import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
	source: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Source",
		required: true,
	},
	exam_year: {
		type: [Number],
		required: true,
		min: 2000,
		max: new Date().getFullYear(),
	},
	exam_type: {
		type: String,
		enum: [
			"school_exam",
			"college_exam",
			"board_exam",
			"admission_exam",
			"government_exam",
			"bcs_exam",
		],
		required: true,
	},
	note: { type: String, default: "No note" },
});

examSchema.index({ source: 1, exam_year: 1, exam_type: 1 });

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);
export default Exam;
