import Link from "next/link";

// components/Footer.js
export default function Footer() {
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

	const follow = [
		{
			name: "Facebook",
			href: "#",
		},
		{
			name: "Twitter",
			href: "#",
		},
		{
			name: "LinkedIn",
			href: "#",
		},
	];

	const policy = [
		{
			name: "Privacy Policy",
			href: "#",
		},
		{
			name: "Terms of Service",
			href: "#",
		},
		{
			name: "Contact Us",
			href: "#",
		},
	];
	return (
		<footer className="bg-gray-600 text-white p-8">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
				<div>
					<h4 className="font-bold mb-4">Quick Links</h4>
					<ul>
						{links.map((link) => (
							<li key={link.name}>
								<Link
									href={link.href}
									className="hover:text-gray-300 hover:underline"
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h4 className="font-bold mb-4">Contact</h4>
					<p>Email: support@livemcq.com</p>
					<p>Phone: +880 1234 567890</p>
				</div>
				<div>
					<h4 className="font-bold mb-4">Follow Us</h4>
					<div className="flex space-x-4">
						{follow.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:opacity-75 hover:underline"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>
			<hr className="mt-2" />
			<div className="container mx-auto px-4 py-6">
				<div className="flex justify-between items-center">
					<div className="text-sm">
						&copy; 2025 Learnwish. All rights reserved.
					</div>
					<ul className="flex space-x-4">
						{policy.map((link) => (
							<li key={link.name}>
								<Link href={link.href} className="hover:text-gray-400">
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}
