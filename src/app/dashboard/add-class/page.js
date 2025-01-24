"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddClassPage() {
	const [classInfo, setClassInfo] = useState({
		name: "",
		subjects: [
			{ name: "", code: "", chapters: [{ name: "", description: "" }] },
		],
	});

	const [existingData, setExistingData] = useState([]);

	// Function to update the class name
	const updateClassName = (newName) => {
		setClassInfo((prev) => ({ ...prev, name: newName }));
	};

	// Function to update a subject's name or code
	const updateSubject = (index, field, value) => {
		const updatedSubjects = [...classInfo.subjects];
		updatedSubjects[index][field] = value;
		setClassInfo((prev) => ({ ...prev, subjects: updatedSubjects }));
	};

	// Function to add a new subject
	const addNewSubject = () => {
		setClassInfo((prev) => ({
			...prev,
			subjects: [...prev.subjects, { name: "", code: "", chapters: [] }],
		}));
	};

	// Function to remove a subject
	const removeSubject = (subjectIndex) => {
		setClassInfo((prev) => ({
			...prev,
			subjects: prev.subjects.filter((_, index) => index !== subjectIndex),
		}));
	};

	// Function to update a chapter inside a subject
	const updateChapter = (subjectIndex, chapterIndex, field, value) => {
		const updatedSubjects = [...classInfo.subjects];
		const updatedChapters = [...updatedSubjects[subjectIndex].chapters];
		updatedChapters[chapterIndex][field] = value;
		updatedSubjects[subjectIndex].chapters = updatedChapters;
		setClassInfo((prev) => ({ ...prev, subjects: updatedSubjects }));
	};

	// Function to add a new chapter to a specific subject
	const addNewChapter = (subjectIndex) => {
		const updatedSubjects = [...classInfo.subjects];
		updatedSubjects[subjectIndex].chapters.push({ name: "", description: "" });
		setClassInfo((prev) => ({ ...prev, subjects: updatedSubjects }));
	};

	// Function to remove a chapter
	const removeChapter = (subjectIndex, chapterIndex) => {
		setClassInfo((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject, sIndex) =>
				sIndex === subjectIndex
					? {
							...subject,
							chapters: subject.chapters.filter(
								(_, cIndex) => cIndex !== chapterIndex
							),
					  }
					: subject
			),
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get("/api/classes");
				setExistingData(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const validateForm = () => {
		if (!classInfo.name.trim()) {
			alert("Class name is required!");
			return false;
		}

		for (const subject of classInfo.subjects) {
			if (!subject.name.trim() || !subject.code.trim()) {
				alert("Subject name and code are required!");
				return false;
			}
			if (subject.chapters.length === 0) {
				alert(`Subject "${subject.name}" must have at least one chapter!`);
				return false;
			}
			for (const chapter of subject.chapters) {
				if (!chapter.name.trim() || !chapter.description.trim()) {
					alert("Chapter name and description are required!");
					return false;
				}
			}
		}
		return true;
	};

	const handleAddClass = async () => {
		if (!validateForm()) return;

		const { name, subjects } = classInfo;

		try {
			await axios.post("/api/classes", { name, subjects });
			alert("Class added successfully!");
			setClassInfo({
				name: "",
				subjects: [{ name: "", code: "", chapters: [] }],
			});
		} catch (error) {
			console.error(error);
			alert("Failed to add class.");
		}
	};

	return (
		<>
			<div className="max-w-4xl mx-auto p-6">
				<h1 className="block font-semibold mb-2">Add Class</h1>
				<input
					type="text"
					placeholder="Class Name"
					value={classInfo.name}
					onChange={(e) => updateClassName(e.target.value)}
					className="border p-2 mt-2 w-full rounded"
				/>
				<h2 className="block font-semibold mb-2 mt-2">Subjects</h2>
				{classInfo.subjects.map((subject, subjectIndex) => (
					<div key={subjectIndex} style={{ marginBottom: "20px" }}>
						<h3 className="">Subject {subjectIndex + 1}</h3>

						<input
							type="text"
							placeholder="Subject Name"
							value={subject.name}
							onChange={(e) =>
								updateSubject(subjectIndex, "name", e.target.value)
							}
							className="border p-2 rounded flex-1"
						/>
						<input
							type="text"
							placeholder="Subject Code"
							value={subject.code}
							onChange={(e) =>
								updateSubject(subjectIndex, "code", e.target.value)
							}
							className="border p-2 rounded flex-2"
						/>

						<button
							onClick={() => removeSubject(subjectIndex)}
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							Remove Subject
						</button>
						<h4 className="block font-semibold mb-2 mt-2">Chapters</h4>
						{subject.chapters.map((chapter, chapterIndex) => (
							<div key={chapterIndex} style={{ margin: "10px 0px" }}>
								<h4>Chapter {chapterIndex + 1}</h4>
								<input
									type="text"
									placeholder="Chapter Name"
									value={chapter.name}
									onChange={(e) =>
										updateChapter(
											subjectIndex,
											chapterIndex,
											"name",
											e.target.value
										)
									}
									className="border p-2 rounded flex-1"
								/>
								<input
									type="text"
									placeholder="Chapter Description"
									value={chapter.description}
									onChange={(e) =>
										updateChapter(
											subjectIndex,
											chapterIndex,
											"description",
											e.target.value
										)
									}
									className="border p-2 rounded flex-2"
								/>
								<button
									onClick={() => removeChapter(subjectIndex, chapterIndex)}
									className="bg-red-500 text-white px-4 py-2 rounded"
								>
									Remove Chapter
								</button>
							</div>
						))}
						<button
							onClick={() => addNewChapter(subjectIndex)}
							className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
						>
							Add Chapter
						</button>
					</div>
				))}
				<button
					onClick={addNewSubject}
					className="bg-green-500 text-white px-4 py-2  rounded"
				>
					Add New Subject
				</button>

				<button
					onClick={handleAddClass}
					className="bg-blue-500 text-white px-6 py-2 mx-4 rounded"
				>
					Save Class
				</button>
			</div>
		</>
	);
}
