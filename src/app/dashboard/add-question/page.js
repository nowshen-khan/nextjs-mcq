"use client";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const AddQuestionForm = () => {
	const [formData, setFormData] = useState({
		questionText: "",
		questionImage: "",
		options: [{ text: "", image: "" }],
		answerText: "",
		answerImage: "",
		noteText: "",
		noteImage: "",
		exams: { source: "", exam_year: "", exam_type: "" },
		meta: {
			class: "",
			subject: "",
			bookPart: "",
			chapter: "",
		},
		difficulty: "Medium",
		tags: [],
	});

	const { data: examSources } = useSWR("/api/exam-sources", fetcher);
	const { data: subjectsByClass } = useSWR("/api/subjects-by-class", fetcher);
	const { data: bookPartsAndChapters } = useSWR(
		"/api/book-parts-and-chapters",
		fetcher
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleMetaChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			meta: {
				...prev.meta,
				[field]: value,
				...(field === "class" ? { bookPart: "", chapter: "" } : {}),
				...(field === "bookPart" ? { chapter: "" } : {}),
			},
		}));
	};

	const handleOptionChange = (index, key, value) => {
		const updatedOptions = [...formData.options];
		updatedOptions[index][key] = value;
		setFormData((prev) => ({ ...prev, options: updatedOptions }));
	};

	const handleAddOption = () => {
		setFormData((prev) => ({
			...prev,
			options: [...prev.options, { text: "", image: "" }],
		}));
	};

	const handleRemoveOption = (index) => {
		const updatedOptions = [...formData.options];
		updatedOptions.splice(index, 1);
		setFormData((prev) => ({ ...prev, options: updatedOptions }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/api/questions", formData);
			alert("Question added successfully!");
			setFormData({
				questionText: "",
				questionImage: "",
				options: [{ text: "", image: "" }],
				answerText: "",
				answerImage: "",
				noteText: "",
				noteImage: "",
				exams: { source: "", exam_year: "", exam_type: "" },
				meta: {
					class: "",
					subject: "",
					bookPart: "",
					chapter: "",
				},
				difficulty: "Medium",
				tags: [],
			});
		} catch (error) {
			console.error("Error adding question:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
		>
			<h2 className="text-2xl font-bold text-gray-800">Add Question</h2>

			<div className="space-y-2">
				<label className="block text-gray-600">Question Text:</label>
				<textarea
					name="questionText"
					value={formData.questionText}
					onChange={handleChange}
					required
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="space-y-2">
				<label className="block text-gray-600">Question Image:</label>
				<input
					type="url"
					name="questionImage"
					value={formData.questionImage}
					onChange={handleChange}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="space-y-2">
				<label className="block text-gray-600">Class:</label>
				<select
					name="meta.class"
					value={formData.meta.class}
					onChange={(e) => handleMetaChange("class", e.target.value)}
					required
					className="w-full p-2 border rounded"
				>
					<option value="">Select Class</option>
					{subjectsByClass &&
						Object.keys(subjectsByClass).map((cls) => (
							<option key={cls} value={cls}>
								{cls}
							</option>
						))}
				</select>
			</div>

			<div className="space-y-2">
				<label className="block text-gray-600">Subject:</label>
				<select
					name="meta.class"
					value={formData.meta.class}
					onChange={(e) => handleMetaChange("subject", e.target.value)}
					required
					className="w-full p-2 border rounded"
				>
					{/* nowshen */}
					<option value="">Select Subject</option>
					{subjectsByClass &&
						Object.keys(subjectsByClass).map((cls) => (
							<option key={cls} value={cls}>
								{cls}
							</option>
						))}
				</select>
			</div>
			{/* Add more fields here as necessary with Tailwind styling */}

			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Add Question
			</button>
		</form>
	);
};

export default AddQuestionForm;
