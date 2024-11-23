'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const page = () => {
    const [token, settoken] = useState("") 
    const [password, setpassword] = useState("")
    const [isLoader, setisLoader] = useState(false)
    const router = useRouter() ;
    useEffect(() => {
        const token = window.location.search.split("=")[1] ;
        settoken(token || "")
    }, [])
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6"> Reset Password </h1>
            <input 
                type="password" 
                placeholder="Enter new password" 
                className="w-full p-2 mb-4 border rounded"
                onChange={(e) => {
                    setpassword(e.target.value)
                }} 
            />
            <button 
                disabled={password.length === 0} 
                className={`w-full p-2 rounded ${password.length === 0 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                onClick={async () => {
                    try {
                        setisLoader(true)
                        const res = await axios.post("/api/reset-password", {token, password})
                        console.log(res)
                        router.push("/login") ;
                    } catch (error : any) {
                        console.log(error)
                    }finally{
                        setisLoader(false)
                    }
                }}> 
                {isLoader ? "Loading..." : "Reset Password"} 
            </button>
        </div>
      }
    </div>
  )
}

export default page
