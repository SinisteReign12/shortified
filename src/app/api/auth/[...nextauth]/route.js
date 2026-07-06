import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async signIn({ user, account }) {

      if (account.provider === "google") {

        await connectDB();

        const existingUser =
          await User.findOne({
            email: user.email,
          });

        if (!existingUser) {

          await User.create({
            name: user.name,
            email: user.email,
            provider: "google",
          });

        }

      }

      return true;
    },
    async jwt({ token, user }) {

      if (user) {

        await connectDB();

        const dbUser = await User.findOne({
          email: user.email,
        });

        if (dbUser) {
          token.id = dbUser._id.toString();
        }

      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;

      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };