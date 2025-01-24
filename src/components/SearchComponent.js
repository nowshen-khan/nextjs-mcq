"use client";

import { useState } from "react";

const SearchComponent = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);

	const handleSearch = async (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		if (value) {
			const res = await fetch(`/api/search?query=${value}`);
			const data = await res.json();
			setResults(data);
		} else {
			setResults([]);
		}
	};

	return (
		<div className="p-4">
			<input
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={handleSearch}
				className="w-full px-4 py-2 border border-gray-300 rounded-md"
			/>
			<ul className="mt-4">
				{results.length > 0 ? (
					results.map((item) => (
						<li key={item.id} className="py-2 border-b">
							{item.title}
						</li>
					))
				) : (
					<p>No results found.</p>
				)}
			</ul>
		</div>
	);
};

export default SearchComponent;
