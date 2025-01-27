import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		image: { type: String },
		googleId: { type: String },
		facebookId: { type: String },
		role: {
			type: String,
			enum: ["student", "admin", "teacher"],
			default: null,
		},
		examsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExamResult" }],
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
