import Link from "next/link";

// components/Footer.js
export default function Footer() {
	return (
		<footer className="bg-gray-800 text-white">
			<div className="container mx-auto px-4 py-6">
				<div className="flex justify-between items-center">
					<div className="text-sm">
						&copy; 2025 Learnwish. All rights reserved.
					</div>
					<ul className="flex space-x-4">
						<li>
							<Link href="#" className="hover:text-gray-400">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href="#" className="hover:text-gray-400">
								Terms of Service
							</Link>
						</li>
						<li>
							<Link href="#" className="hover:text-gray-400">
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
