"use client"; 
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
const page = () => {
  const router = useRouter(); 
  const [isButtonDisabled, setisButtonDisabled] = useState(true) 

  const [user, setuser] = useState({
    email : "" ,
    password : "" ,
    username : "" , 
  }) ;
  useEffect(() => {
    if(user.email && user.password && user.username){
      setisButtonDisabled(false)}
    else{
      setisButtonDisabled(true)
    }
  }, [user])

  const [isLoader, setisLoader] = useState(false)

  const handleSubmit = async () => {
    try {
      setisLoader(true)
      await axios.post("/api/signup", user)
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
    finally{
      setisLoader(false)
    }
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <input 
          type="text" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"  
          placeholder="Username" 
          value={user.username} 
          onChange={(e) => setuser({...user, username : e.target.value})} 
        />
        <input 
          type="email" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg" 
          placeholder="Email" 
          value={user.email} 
          onChange={(e) => setuser({...user, email : e.target.value})} 
        />
        <input 
          type="password" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg" 
          placeholder="Password" 
          value={user.password} 
          onChange={(e)=>{setuser({...user , password : e.target.value})}} 
        /> 
        <button onClick={(e)=>{e.preventDefault() ; handleSubmit()}} className="w-full bg-blue-600 p-4 rounded-lg text-white hover:bg-blue-700 disabled:hover:cursor-not-allowed" disabled={isButtonDisabled}> {isLoader ? "Loading" : "Sign Up" }</button>
      </div>
        <Link className="text-blue-500 mt-10 no-underline px-4 py-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out" href={"/login"}> Already have an account ?  </Link>
    </div>
  )
}

export default page
