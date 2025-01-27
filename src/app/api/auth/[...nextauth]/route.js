import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

dbConnect();

export const authOptions = {
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
				const user = await User.findOne({ email: credentials.identifier });
				if (!user) {
					throw new Error("User not found");
				}
				const isValidPassword = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isValidPassword) {
					throw new Error("Invalid credentials");
				}
				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account.provider === "google") {
				const existingUser = await User.findOne({ email: profile.email });
				if (!existingUser) {
					await User.create({
						googleId: profile.sub,
						name: profile.name,
						email: profile.email,
						image: profile.picture,
						role: null,
					});
				}
			} else if (account.provider === "facebook") {
				const existingUser = await User.findOne({ email: profile.email });
				if (!existingUser) {
					await User.create({
						facebookId: profile.id,
						name: profile.name,
						email: profile.email || "No Email",
						role: null,
					});
				}
			}
			return true;
		},
		async redirect({ url, baseUrl }) {
			// const dbUser = await User.findOne({ email: url.user?.email });
			// if (dbUser && !dbUser.role) {
			// 	return `${baseUrl}/role-setup`;
			// }
			return `${baseUrl}/role-setup`;
		},
		async session({ session, token, user }) {
			const dbUser = await User.findOne({ email: session.user.email });
			if (dbUser) {
				session.user.id = dbUser._id.toString();
				session.user.role = dbUser.role;
			}

			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
