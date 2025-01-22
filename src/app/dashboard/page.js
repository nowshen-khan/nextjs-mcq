import Image from "next/image";
const Dashboard = () => {
	return (
		<div className="container">
			<h1>Dashboard</h1>
			<div className="row-auto">
				<div className="col-auto">
					<div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
						{/* Card Image */}
						<Image
							src=""
							alt="Card Image"
							className="w-full h-48 object-cover"
							width={400}
							height={200}
						/>
						{/* Card Content */}
						<div className="p-4">
							<h2 className="text-lg font-bold text-gray-800">Card Title</h2>
							<p className="text-gray-600 mt-2">
								This is a sample card description. You can use it to showcase
								your content or products.
							</p>
							<button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
								Learn More
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
