import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import axios from "axios";


const adminEmails = ['cesarluislojancampoverde8@gmail.com','cesar.lojan8@gmail.com'];
console.log("uwu")
export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
	  signIn:({user,account,profile,email,credentials})=>{
		console.log(user)
		return true
	  },
    session: ({session,token,user}) => {
		console.log(session)
      if (adminEmails.includes(session?.user?.email)) {
		  
        return session;
		
      } else {
		  
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res,authOptions);
  console.log("aaa")
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
	console.log("No es un admin")
  }
}
