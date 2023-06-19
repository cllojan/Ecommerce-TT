import NextAuth from "next-auth/next";
//import GithubProvider from "next-auth/providers/github"
//import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    GoogleProvider({
        clientId:process.env.GOOGLE_ID,
        clientSecret:process.env.GOOGLE_SECRET
    }),
    
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
});

