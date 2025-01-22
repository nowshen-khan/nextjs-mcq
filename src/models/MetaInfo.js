import mongoose from "mongoose";

const metaInfoSchema = new mongoose.Schema(
	{
		class: {
			type: String,
			enum: [
				"Class 1",
				"Class 2",
				"Class 3",
				"Class 4",
				"Class 5",
				"Class 6",
				"Class 7",
				"Class 8",
				"Class 9-10",
				"Class 11-12",
				"Medical",
				"University",
				"Job",
			],
			required: true,
		},
		subjects: {
			type: [String], // Subjects for the class
			required: true,
		},
		chapters: [
			{
				name: { type: String, required: true },
				description: { type: String },
			},
		],
	},
	{ timestamps: true }
);

// Index to improve query performance
metaInfoSchema.index({
	class: 1,
	subjects: 1,
});

const MetaInfo =
	mongoose.models.MetaInfo || mongoose.model("MetaInfo", metaInfoSchema);
export default MetaInfo;
