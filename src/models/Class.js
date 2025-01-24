import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String },
});

const subjectSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	code: { type: String, required: true, unique: true },
	chapters: [chapterSchema],
});

const classSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	subjects: [subjectSchema],
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

classSchema.index({
	class: 1,
	subjects: 1,
	chapters: 1,
});

export default Class;
