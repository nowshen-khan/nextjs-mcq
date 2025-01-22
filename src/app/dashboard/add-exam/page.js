"use client";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Fetcher function for SWR
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const AddExam = () => {
	const [formData, setFormData] = useState({
		source: "",
		exam_year: "",
		exam_type: "",
		note: "",
	});
	const [message, setMessage] = useState("");

	// Fetch sources using SWR and axios
	const { data: sources, error } = useSWR("/sources", fetcher);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/exams", formData);

			setMessage("Exam added successfully!");
			setFormData({
				source: "",
				exam_year: "",
				exam_type: "",
				note: "",
			});
		} catch (error) {
			const errorMsg = error.response?.data?.message || "Failed to add exam";
			setMessage(`Error: ${errorMsg}`);
		}
	};

	if (error) return <p>Error loading sources</p>;
	if (!sources) return <p>Loading...</p>;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Add New Exam
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4 p-6">
					<div className="mb-2">
						<label className="block text-gray-600">Source:</label>
						<select
							name="source"
							value={formData.source}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select Source</option>
							{sources.map((source) => (
								<option key={source._id} value={source._id}>
									{source.bnName} ({source.enName})
								</option>
							))}
						</select>
					</div>

					<div className="mb-2">
						<label className="block text-gray-600">Exam Year:</label>
						<input
							type="number"
							name="exam_year"
							value={formData.exam_year}
							onChange={handleChange}
							min="2000"
							max={new Date().getFullYear()}
							required
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-2">
						<label className="block text-gray-600">Exam Type:</label>
						<select
							name="exam_type"
							value={formData.exam_type}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select Exam Type</option>
							<option value="school_exam">School Exam</option>
							<option value="college_exam">College Exam</option>
							<option value="board_exam">Board Exam</option>
							<option value="admission_exam">Admission Exam</option>
							<option value="government_exam">Government Exam</option>
							<option value="bcs_exam">BCS Exam</option>
						</select>
					</div>

					<div className="mb-2">
						<label className="block text-gray-600">Note:</label>
						<input
							type="text"
							name="note"
							value={formData.note}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
					>
						Add Exam
					</button>
				</form>

				{message && <p className="mt-4 text-center text-gray-600">{message}</p>}
			</div>
		</div>
	);
};

export default AddExam;
