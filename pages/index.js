import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        
        <button onClick={()=> signIn()} className="bg-white p-2 px-4 text-black rounded-lg">Login with google</button>
      </div>
    </div>
    )
  }
  return (
    <div>
      Logged in {session.user.email}
    </div>
  )
}
