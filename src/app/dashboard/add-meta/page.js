"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const MetaInfoPage = () => {
	const [metaInfo, setMetaInfo] = useState({
		class: "",
		newClass: "", // For adding new class
		subject: "",
		newSubject: "", // For adding new subject
		chapters: [{ name: "", description: "" }],
		newChapter: [{ name: "", description: "" }],
	});
	const [classList, setClassList] = useState([]);
	const [subjectList, setSubjectList] = useState([]);
	const [chapterList, setChapterList] = useState([]);

	useEffect(() => {
		// Fetch existing meta info from the database
		axios
			.get("/api/meta-info")
			.then((response) => {
				setClassList(response.data.map((item) => item.class));
				setSubjectList(response.data.flatMap((item) => item.subjects));
				setChapterList(
					response.data.flatMap((item) =>
						item.chapters.map((chapter) => chapter.name)
					)
				);
			})
			.catch((error) => {
				console.error("Error fetching meta info:", error);
			});
	}, []);

	const handleMetaInfoChange = (e) => {
		const { name, value } = e.target;
		setMetaInfo((prev) => ({ ...prev, [name]: value }));
	};

	const handleChapterChange = (e, index) => {
		const { name, value } = e.target;
		const updatedChapters = [...metaInfo.chapters];
		updatedChapters[index][name] = value;
		setMetaInfo((prev) => ({ ...prev, chapters: updatedChapters }));
	};

	const handleAddChapter = () => {
		setMetaInfo((prev) => ({
			...prev,
			chapters: [...prev.chapters, { name: "", description: "" }],
		}));
	};

	// Remove Chapter Function
	const handleRemoveChapter = (index) => {
		const updatedChapters = metaInfo.chapters.filter((_, i) => i !== index);
		setMetaInfo((prev) => ({ ...prev, chapters: updatedChapters }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const dataToSubmit = {
				...metaInfo,
				subject:
					metaInfo.subject === "new" ? metaInfo.newSubject : metaInfo.subject, // Use new subject if selected
				class: metaInfo.class === "new" ? metaInfo.newClass : metaInfo.class,
				chapters: metaInfo.chapters.map((chapter) => ({
					name: chapter.name,
					description: chapter.description,
				})),
			};

			const response = await axios.post("/api/meta-info", dataToSubmit);
			const newSubject =
				metaInfo.subject === "new" ? metaInfo.newSubject : null;
			if (newSubject) {
				setSubjectList((prev) => [...prev, newSubject]); // Update subject list in frontend
			}
			const newClass = metaInfo.class === "new" ? metaInfo.newClass : null;
			if (newClass) {
				setClassList((prev) => [...prev, newClass]); // Update class list in frontend
			}

			alert("Meta info saved successfully!");
		} catch (error) {
			alert("Error saving meta info.");
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Meta Information</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-semibold">Class</label>

					<select
						name="class"
						value={metaInfo.class}
						onChange={handleMetaInfoChange}
						className="mt-2 p-2 border border-gray-300 rounded w-full"
						required
					>
						<option value="">Select Class</option>
						{classList.map((className) => (
							<option key={className} value={className}>
								{className}
							</option>
						))}
						<option value="new">Add New Class</option>
					</select>
				</div>
				{metaInfo.class === "new" && (
					<div>
						<label className="block text-sm font-semibold">
							New Class Name
						</label>
						<input
							type="text"
							name="newClass"
							value={metaInfo.newClass}
							onChange={handleMetaInfoChange}
							placeholder="Enter new class name"
							className="mt-2 p-2 border broder-gray-300 rounded w-full"
							required
						/>
					</div>
				)}

				<div>
					<label className="block text-sm font-semibold">Subject</label>
					<select
						name="subject"
						value={metaInfo.subject}
						onChange={handleMetaInfoChange}
						className="mt-2 p-2 border border-gray-300 rounded w-full"
						required
					>
						<option value="">Select Subject</option>
						{subjectList.map((subject) => (
							<option key={subject} value={subject}>
								{subject}
							</option>
						))}
						<option value="new">Add New Subject</option>
					</select>
				</div>

				{metaInfo.subject === "new" && (
					<div>
						<label className="block text-sm font-semibold">
							New Subject Name
						</label>
						<input
							type="text"
							name="newSubject"
							value={metaInfo.newSubject}
							onChange={handleMetaInfoChange}
							placeholder="Enter new subject name"
							className="mt-2 p-2 border border-gray-300 rounded w-full"
							required
						/>
					</div>
				)}

				<div>
					<h3 className="text-lg font-semibold">Chapters</h3>
					{metaInfo.chapters.map((chapter, index) => (
						<div
							key={index}
							className="space-y-2 mt-2 border p-4 rounded bg-gray-50 relative"
						>
							<input
								type="text"
								name="name"
								value={chapter.name}
								onChange={(e) => handleChapterChange(e, index)}
								placeholder="Chapter Name"
								className="p-2 border border-gray-300 rounded w-fit"
								required
							/>
							<textarea
								name="description"
								value={chapter.description}
								onChange={(e) => handleChapterChange(e, index)}
								placeholder="Chapter Description"
								className="p-2 border border-gray-300 rounded w-full"
								rows="3"
							/>
							{metaInfo.chapters.length > 1 && (
								<button
									type="button"
									onClick={() => handleRemoveChapter(index)}
									className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
								>
									Remove
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={handleAddChapter}
						className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Add Chapter
					</button>
				</div>

				<div className="flex justify-center">
					<button
						type="submit"
						className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
					>
						Save Meta Info
					</button>
				</div>
			</form>
		</div>
	);
};

export default MetaInfoPage;
