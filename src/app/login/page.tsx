'use client'
import { useState,useEffect } from "react";
import Link from "next/link";
import axios, { Axios, AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
  const router = useRouter() ;
  const [user, setuser] = useState({
    password : "" ,
    username : "" , 
  }) ;
  const [isButtonDisabled, setisButtonDisabled] = useState(true) 
  const [isLoader, setisLoader] = useState(false)
  useEffect(() => {
    if(user.password && user.username){
      setisButtonDisabled(false)}
    else{
      setisButtonDisabled(true)
    }
  }, [user])
  const [isPasswordCorrect, setisPasswordCorrect] = useState(true) 
  const handleSubmit = async () => {
    try {
      setisLoader(true)
      const res = await axios.post("/api/login", user)
      toast.success('User logged in successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      router.push("/profile/") ;
      
    } catch (error : any) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      setisPasswordCorrect(false)
      toast.error('Login failed. Try again', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
    }finally{
      setisLoader(false)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input 
          type="text" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"  
          placeholder="Username" 
          value={user.username} 
          onChange={(e) => setuser({...user, username : e.target.value})} 
        />
       
        <input 
          type="password" 
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg" 
          placeholder="Password" 
          value={user.password} 
          onChange={(e)=>{setuser({...user , password : e.target.value})}} 
        /> 
        <button className="w-full bg-blue-600 p-4 rounded-lg text-white hover:bg-blue-700 flex justify-center"disabled={isButtonDisabled} onClick={(e)=>{handleSubmit()}}> {isLoader ? <AiOutlineLoading3Quarters /> : "Login" }</button>
        {!isPasswordCorrect && <p className="text-red-500 text-center mt-4"> Invalid Username or Password </p>}
        <Link className="text-blue-500 flex justify-center mt-4 no-underline" href={"/forgot-password"}> Forgot Password? </Link>
      </div>
        <Link className="text-blue-500 mt-10 no-underline px-4 py-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out" href={"/signup"}> Create a new account  </Link>
    </div>
  )
}

export default page
