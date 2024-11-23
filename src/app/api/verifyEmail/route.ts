import User from "@/models/user.model";

import { connectDB } from "@/dbConnect/connectDB";
import { NextRequest, NextResponse } from "next/server";

await connectDB(); 

export async function POST(request : NextRequest) {
    try {
            const {verifyToken} = await request.json() ;
            const user = await User.findOne({ verifyToken });
            if(!user){
                return NextResponse.json({ error: "Invalid Token or already verified" }, { status: 400 });
            }
            if(user.verifyTokenExpiry < Date.now()){
                return NextResponse.json({ error: "Token Expired" }, { status: 400 });
            }
           
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save();
            return NextResponse.json({ message: "Email Verified" }, { status: 200 });
            
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}