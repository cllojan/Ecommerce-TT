import { useSession, signIn, signOut } from "next-auth/react"
import NavLeft from '../components/Nav';
export function Layout({children}){
  const { data: session } = useSession()
  
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
      <NavLeft />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
      </div>      
    </div>
    
  )
}

