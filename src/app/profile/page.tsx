"use client"
import axios from "axios"
import { useRouter } from "next/navigation" 
import React , {useEffect, useState} from "react"
const page = ({params} : any) => {
  const router = useRouter() ;
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout")
      router.push("/login")
      
    } catch (error : any) {
      console.log(error.message)
    }
  }
  const [user, setuser] = useState(null)

useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me")
        setuser(response.data.user.username)
      } catch (error : any) {
        console.log(error.message)
      }
    }
    fetchUser()
}, [])

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Profile</h1>
      <div className="mb-4">
        <button onClick={(e)=>{router.push("/profile/" + user )}} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" disabled={user === null}>
          {user === null ? "Not logged in" : "View Profile"}
        </button>
      </div>
      <button onClick={(e)=>{handleLogout()}} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        Logout
      </button>
    </div>
  )
}
export default page
