import Link from "next/link"
export default function Home() {
  return (
      <>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8"> Authentication Demo </h1>
            <Link href={"/login"}>  
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    Login
                </button>
            </Link>
            <Link href={"/signup"}>  
                <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                    Signup
                </button>
            </Link>
            <Link href={"/profile"}>  
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                    Profile
                </button>
            </Link>
          </div>
      </>
  )
}