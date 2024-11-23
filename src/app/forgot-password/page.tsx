'use client'
import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const page = () => {

    const [email, setemail] = useState("")

    const [error, seterror] = useState(false)

    const [mailsent, setmailsent] = useState(false)

    const [isLoader, setisLoader] = useState(false)

    const submitHandler = async () => {
        try {
            setisLoader(true)
            const res = await axios.post("/api/verificationmail", { email })
            console.log(res.data)
            setmailsent(true)
        } catch (error) {
            console.log(error)
            // Toaster error
            seterror(true)
        }
        finally {
            setisLoader(false)
        }

    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm' onSubmit={(e) => { e.preventDefault(); submitHandler() }}>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Forgot Password</h2>
                <input type="email" placeholder="Email" className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500' value={email} onChange={(e) => {
                    setemail(e.target.value)
                }} />
                <button type='submit' className='w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 flex justify-center items-center' disabled={email.length == 0} >
                    {isLoader ? <AiOutlineLoading3Quarters className='animate-spin' /> : "Submit"}
                </button>
                {error && <p className='text-red-500 text-center mt-4'>Something went wrong</p>}
                {mailsent && <div className='mt-4'>
                    <p className='text-green-500 text-center'>Email sent successfully</p>
                    <p className='text-center text-gray-700'>Please check your email to reset your password</p>
                    <Link href="/login ">
                        <button type="button" className='w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 flex justify-center items-center'>
                            Login
                        </button>
                    </Link>
                </div>}
            </form>
        </div>
    )
}

export default page
