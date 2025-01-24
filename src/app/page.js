import SearchComponent from "@/components/SearchComponent";
import Image from "next/image";

export default function Home() {
	return (
		<div className="bg-gray-100">
			{/* Hero Section */}
			<section
				className="relative bg-blue-500 text-white py-20 text-center bg-cover bg-center"
				style={{
					backgroundImage: "url('/images/learnwish.webp')",
				}}
			>
				<div
					className="bg-black bg-opacity-50 p-6 transition duration-300 ease-in-out transform hover:scale-105
"
				>
					<h2 className="text-4xl font-bold mb-4">Welcome to Learnwish</h2>
					<p className="text-lg mb-6">
						Your Ultimate Destination for Online Exams and Learning.
					</p>
					<button
						className="bg-yellow-400 text-blue-900 px-6 py-2 rounded hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105
"
					>
						Get Started
					</button>
				</div>
				<section className="bg-transparent py-8">
					<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div>
							<h4 className="text-3xl font-bold text-blue-600">50,000+</h4>
							<p className="text-xl text-white font-bold">প্রশ্ন</p>
						</div>
						<div>
							<h4 className="text-3xl font-bold text-blue-600">10,000+</h4>
							<p className="text-xl text-white font-bold"> ব্যবহারকারী</p>
						</div>
						<div>
							<h4 className="text-3xl font-bold text-blue-600">100+</h4>
							<p className="text-xl text-white font-bold">Subjects</p>
						</div>
					</div>
				</section>
			</section>

			{/* Features Section */}
			<section className="py-16">
				<div className="container mx-auto text-center">
					<h3 className="text-2xl font-bold mb-8">Our Features</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white shadow-lg p-6 rounded">
							<h4 className="text-xl font-bold mb-2">Subject-wise Questions</h4>
							<p>
								Access thousands of questions sorted by subjects and difficulty
								levels.
							</p>
						</div>
						<div className="bg-white shadow-lg p-6 rounded">
							<h4 className="text-xl font-bold mb-2">Timed Exams</h4>
							<p>
								Take exams with real-time timers to practice under exam
								conditions.
							</p>
						</div>
						<div className="bg-white shadow-lg p-6 rounded">
							<h4 className="text-xl font-bold mb-2">Instant Results</h4>
							<p>Get instant feedback and analysis of your performance.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}

			<section className="py-16 bg-white">
				<div className="container mx-auto text-center">
					<h3 className="text-2xl font-bold mb-8">What Our Students Say</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-gray-100 p-6 rounded shadow">
							<p className="italic">"This platform helped me ace my exams!"</p>
							<h4 className="mt-4 font-bold">- Student A</h4>
						</div>
						<div className="bg-gray-100 p-6 rounded shadow">
							<p className="italic">
								"The instant feedback system is amazing."
							</p>
							<h4 className="mt-4 font-bold">- Student B</h4>
						</div>
						<div className="bg-gray-100 p-6 rounded shadow">
							<p className="italic">"A great resource for practicing MCQs."</p>
							<h4 className="mt-4 font-bold">- Student C</h4>
						</div>
					</div>
				</div>
			</section>

			{/* call to action */}
			<section className="bg-blue-500 text-white py-16 text-center">
				<h3 className="text-3xl font-bold mb-6">Join Live MCQ Today!</h3>
				<p className="mb-6">Sign up now and start your learning journey.</p>
				<button
					className="bg-yellow-400 text-blue-900 px-6 py-2 rounded hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105
"
				>
					Sign Up Now
				</button>
			</section>
		</div>
	);
}
