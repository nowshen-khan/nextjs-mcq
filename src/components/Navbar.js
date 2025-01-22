// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showScrollButton, setShowScrollButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 30) {
				setShowScrollButton(true);
			} else {
				setShowScrollButton(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<nav className="bg-blue-800 text-white">
			<div className="container mx-auto flex items-center justify-between p-4">
				<div className="text-lg font-bold">Learnwish</div>
				<ul className="hidden md:flex space-x-6">
					<li>
						<Link href="#" className="hover:text-gray-300">
							Home
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-300">
							About
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-300">
							Services
						</Link>
					</li>
					<li>
						<Link href="#" className="hover:text-gray-300">
							Contact
						</Link>
					</li>
				</ul>

				{/* Hamburger Menu Button */}
				<button
					className="md:hidden bg-blue-500 p-2 rounded"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
						/>
					</svg>
				</button>
			</div>
			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden bg-blue-500">
					<ul className="flex flex-col items-center space-y-4 p-4">
						<li>
							<a href="#" className="hover:text-gray-300">
								Home
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-gray-300">
								About
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-gray-300">
								Services
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-gray-300">
								Contact
							</a>
						</li>
					</ul>
				</div>
			)}

			{showScrollButton && (
				<button
					className="fixed bottom-5 right-5 bg-black text-white p-2 w-10 h-10 flex justify-center align-middle cursor-pointer border-none rounded-full shadow-black transition-all duration-300 hover:bg-gray-500"
					onClick={scrollToTop}
				>
					↑
				</button>
			)}
		</nav>
	);
}
