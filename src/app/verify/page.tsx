"use client"
import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
const page = () => {
    const [error, seterror] = useState(false)
    const [isverified , setisverified] = useState(false)
    const verify = async (token : any) => {
        try {
            const response = await axios.post("/api/verifyEmail", { verifyToken: token });
            console.log(response.data);
            setisverified(true);
        } catch (error) {
            seterror(true);
            console.log(error);
    }
}
    const [token, settoken] = useState("");
    useEffect(() => {
        const query = window.location.search.substring(1);
        const token = query.split("=")[1];
        settoken(token || "");
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            verify(token);
        }
    }, [token])
    return (
        <div>
            {error && <h1>There was an error verifying your email</h1>}
            {isverified && <h1>Your email has been verified</h1>}
        </div>
    )
}

export default page
