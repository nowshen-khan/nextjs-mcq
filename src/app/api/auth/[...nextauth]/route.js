import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],

	providers: [
		// Google Login
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// Facebook Login
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		// Email/Phone Login
		CredentialsProvider({
			name: "Email or Phone",
			credentials: {
				identifier: { label: "Email/Phone", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// এখানে আপনার ব্যাকএন্ডে ইউজার ভেরিফিকেশন লজিক লিখুন
				const user = { id: 1, name: "User", email: credentials.identifier };
				if (user) return user;
				return null;
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
		verifyRequest: "/auth/verify-request",
		newAccount: "/auth/new-account",
	},
	secret: process.env.NEXTAUTH_SECRET, // Add a strong secret in your .env.local};
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
