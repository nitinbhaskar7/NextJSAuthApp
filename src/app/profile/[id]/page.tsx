'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './page.css' // Import the CSS file for the moving color effect

const page = ({params} : any) => {
    const [user, setuser]: any = useState(null);
    const getUserData = async () => {
        try {
            const res = await axios.get(`/api/users/me`)
            setuser(res.data.user);
            console.log(res.data.user)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={async (e) => {
                e.preventDefault()
                getUserData();
            }}>
                Fetch User Details
            </button>
            {
                user?
                    <div className="bg-white p-6 rounded shadow-md text-center border-animate  animate-moving-color border-animate">
                        <p>Username : {user.username}</p>
                        <p>Role : {user.role}</p>
                        <p>Email : {user.email}</p>
                    </div> : <div className="bg-white p-6 rounded shadow-md text-center animate-moving-color border-animate">
                        Click on the button to fetch user details
                    </div>
            }
        </div>
    )
}

export default page
