"use client";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import styles from "./page.module.css"; // Import CSS module

const fetcher = async (url, { arg }) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});

	if (!response.ok) {
		const errorData = await response.json();

		throw new Error(errorData.message || "Something went wrong!");
	}
	return response.json();
};

const AddSource = () => {
	const [formData, setFormData] = useState({
		bnName: "",
		enName: "",
		bnAbbreviation: "",
		enAbbreviation: "",
		type: "",
		location: "",
	});
	const [message, setMessage] = useState("");

	const locations = [
		{ value: null, label: "None" },
		{ value: "Dhaka", label: "Dhaka" },
		{ value: "Rajshahi", label: "Rajshahi" },
		{ value: "Chittagong", label: "Chittagong" },
		{ value: "Khulna", label: "Khulna" },
		{ value: "Barisal", label: "Barisal" },
		{ value: "Sylhet", label: "Sylhet" },
		{ value: "Comilla", label: "Comilla" },
		{ value: "Jessore", label: "Jessore" },
		{ value: "Mymensingh", label: "Mymensingh" },
	];

	// SWR Mutation
	const { trigger, isMutating } = useSWRMutation("/api/sources", fetcher);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await trigger(formData);
			setMessage("Source added successfully!");
			setFormData({
				bnName: "",
				enName: "",
				bnAbbreviation: "",
				enAbbreviation: "",
				type: "",
				location: "",
			});
		} catch (error) {
			setMessage(
				"Error: " + (error.response?.data?.message || "Something went wrong")
			);
		}
	};

	return (
		<div className={styles.addSourceContainer}>
			<div className={styles.formContainer}>
				<h2 className={styles.formTitle}>Add New Source</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.formGroup}>
						<label htmlFor="bnName" className={styles.formLabel}>
							Institution Name (Bangla):
						</label>
						<input
							type="text"
							name="bnName"
							id="bnName"
							value={formData.bnName}
							onChange={handleChange}
							required
							className={styles.formInput}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="enName" className={styles.formLabel}>
							Institution Name (English):
						</label>
						<input
							type="text"
							name="enName"
							id="enName"
							value={formData.enName}
							onChange={handleChange}
							required
							className={styles.formInput}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="bnAbbreviation" className={styles.formLabel}>
							Abbreviation (Bangla):
						</label>
						<input
							type="text"
							name="bnAbbreviation"
							id="bnAbbreviation"
							value={formData.bnAbbreviation}
							onChange={handleChange}
							className={styles.formInput}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="enAbbreviation" className={styles.formLabel}>
							Abbreviation (English):
						</label>
						<input
							type="text"
							name="enAbbreviation"
							id="enAbbreviation"
							value={formData.enAbbreviation}
							onChange={handleChange}
							required
							className={styles.formInput}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="type" className={styles.formLabel}>
							Type:
						</label>
						<select
							name="type"
							id="type"
							value={formData.type}
							onChange={handleChange}
							required
							className={styles.formInput}
						>
							<option value="">Select Type</option>
							<option value="school">School</option>
							<option value="college">College</option>
							<option value="board">Board</option>
							<option value="university">University</option>
							<option value="job">Job</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="location" className={styles.formLabel}>
							Location:
						</label>
						<select
							name="location"
							id="location"
							value={formData.location}
							onChange={handleChange}
							className={styles.formInput}
						>
							{locations.map((location) => (
								<option key={location.value} value={location.value}>
									{location.label}
								</option>
							))}
						</select>
					</div>

					<button
						type="submit"
						className={styles.submitBtn}
						disabled={isMutating}
					>
						{isMutating ? "Adding..." : "Add Source"}
					</button>
				</form>

				{message && <p className={styles.message}>{message}</p>}
			</div>
		</div>
	);
};

export default AddSource;
