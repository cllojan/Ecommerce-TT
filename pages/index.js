import { Layout as lay } from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  
  return (    
      <lay>
    <div className="text-blue-900 flex justify-between">
      <h2>
      Hellos, <b>{session?.user?.email}  </b>
      </h2>
      <div className="flex bg-gray-200 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" srcset="" className="w-6 h-8 "/>
        <span className="py-1 px-2">{session?.user?.name}</span>
      </div>      
    </div>
  </lay>        
  )  
}
