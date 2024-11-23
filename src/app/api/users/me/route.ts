// When this end point is HIT with a GET request, it will return the user details of the user who is logged in.

import { getTokendata } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/dbConnect/connectDB";
await connectDB() ;
export async function GET(request : NextRequest){
    try {
        
        const token  = request.cookies.get("token") ; 
        if(!token?.value){
            return NextResponse.json({message : "You are not logged in"} , {status : 401})
        }
        const user_id = getTokendata(token.value) ; 

        const user = await User.findById(user_id) ; 
        if(!user){
            return NextResponse.json({message : "User not found"} , {status : 404})
        }

        return NextResponse.json({ message : "User found" , user})


    } catch (error : any) {
        console.log(error.message)
    }

}