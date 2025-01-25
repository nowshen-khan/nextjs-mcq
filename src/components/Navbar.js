// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showScrollButton, setShowScrollButton] = useState(false);
	const { data: session } = useSession();
	const [isHovered, setIsHovered] = useState(false);

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

	const links = [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "Subjects",
			href: "/subjects",
		},
		{
			name: "Exams",
			href: "/exams",
		},
		{
			name: "Contact",
			href: "/contact",
		},
	];

	return (
		<nav className="bg-blue-800 text-white">
			<div className="container mx-auto flex items-center justify-between p-4">
				<div className="text-lg font-bold">
					<Link href={"/"}>LEARNWISH</Link>
				</div>
				<ul className="hidden md:flex space-x-6">
					{links.map((link) => (
						<li key={link.name}>
							<Link href={link.href} className="hover:text-gray-300">
								{link.name}
							</Link>
						</li>
					))}
					{session ? (
						<div>
							<p>Welcome, {session.user.name}</p>
							<button onClick={() => signOut()}>Sign Out</button>
						</div>
					) : (
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<MenuButton
									className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
								>
									Login
									<ChevronDownIcon
										aria-hidden="true"
										className="-mr-1 size-5 text-gray-400"
									/>
								</MenuButton>
							</div>

							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
							>
								<div className="py-1">
									<MenuItem>
										<button
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
											onClick={() => signIn("google")}
										>
											Google
										</button>
									</MenuItem>
									<MenuItem>
										<button
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
											onClick={() => signIn("facebook")}
										>
											Facebook
										</button>
									</MenuItem>
								</div>
							</MenuItems>
						</Menu>
					)}
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
						{links.map((link) => (
							<li key={link.name}>
								<Link href={link.href} className="hover:text-gray-300">
									{link.name}
								</Link>
							</li>
						))}
						{session ? (
							<div>
								<p>Welcome, {session.user.name}</p>
								<button onClick={() => signOut()}>Sign Out</button>
							</div>
						) : (
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<MenuButton
										className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}
									>
										Login
										<ChevronDownIcon
											aria-hidden="true"
											className="-mr-1 size-5 text-gray-400"
										/>
									</MenuButton>
								</div>

								<MenuItems
									transition
									className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
								>
									<div className="py-1">
										<MenuItem>
											<button
												className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
												onClick={() => signIn("google")}
											>
												Google
											</button>
										</MenuItem>
										<MenuItem>
											<button
												className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
												onClick={() => signIn("facebook")}
											>
												Facebook
											</button>
										</MenuItem>
									</div>
								</MenuItems>
							</Menu>
						)}
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
