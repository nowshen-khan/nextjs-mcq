/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "via.placeholder.com",
				port: "",
				pathname: "/400x200/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
