import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
	{
		question: {
			text: { type: String, required: true, maxlength: 500 }, // প্রশ্নের টেক্সট অংশ
			image: {
				type: String,
				default: "",
				validate: {
					validator: function (v) {
						return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(v);
					},
					message: "Invalid image URL.",
				},
			},
		},
		hash: { type: String, unique: true, required: true },
		options: {
			type: [
				{
					text: { type: String, maxlength: 200 }, // অপশনের টেক্সট অংশ
					image: {
						type: String,
						default: "",
						validate: {
							validator: function (v) {
								return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(v);
							},
							message: "Invalid image URL.",
						},
					},
					isCorrect: { type: Boolean },
				},
			],
			required: true,
			validate: {
				validator: function (v) {
					return v && v.length > 0; // অন্তত একটি অপশন থাকতে হবে
				},
				message: "At least one option is required.",
			},
		},

		note: {
			text: String, // নোটের টেক্সট অংশ
			image: {
				type: String,
				default: "No note",
				validate: {
					validator: function (v) {
						return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(v);
					},
					message: "Invalid image URL.",
				},
			},
		},
		exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
		meta: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MetaInfo", // Reference to the MetaInfo model
			required: true,
		},
		meta: {
			class: { type: [String], required: true },
			subject: { type: String, required: true },
			bookPart: { type: Number, default: null },
			chapter: { type: String },
		},
		difficulty: {
			type: String,
			enum: ["Easy", "Medium", "Hard"],
			default: "medium",
		},
		tags: { type: [String], default: [] },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

// index
questionSchema.index({
	"meta.class": 1,
	"meta.subject": 1,
	"meta.chapter": 1,
	difficulty: 1,
});

const Question =
	mongoose.models.Question || mongoose.model("Question", questionSchema);
export default Question;
