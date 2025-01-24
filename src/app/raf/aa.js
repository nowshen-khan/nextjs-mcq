<div className="flex justify-center items-center bg-gray-800">
	{/* Icon */}
	<div
		className="relative"
		onMouseEnter={() => setIsHovered(true)} // Show on hover
		onMouseLeave={() => setIsHovered(false)} // Hide when hover ends
	>
		<button className="bg-gray-800 text-white px-4 py-2 rounded-full">
			Login
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</button>
		{/* Dropdown List */}
		{isHovered && (
			<div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4">
				<button
					className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mb-2 hover:bg-blue-500"
					onClick={() => signIn("google")}
				>
					Google
				</button>
				<button
					className="bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-500"
					onClick={() => signIn("facebook")}
				>
					Facebook
				</button>
			</div>
		)}
	</div>
</div>;
