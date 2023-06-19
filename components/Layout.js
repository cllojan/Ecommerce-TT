import { useSession, signIn, signOut } from "next-auth/react"
import { Nav} from '@/components/Nav';
export default function Layout({children}) {
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
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
     <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
     </div>      
    </div>
  )
}
