import User from "@/models/user.model";
import { connectDB } from "@/dbConnect/connectDB";
import { NextRequest, NextResponse } from "next/server";

await connectDB();

export async function POST(request: NextRequest) {
  try {
    const { token , password } = await request.json();
    const user = await User.findOne({ forgotPasswordToken: token }) ;

    if(!user){
     return  NextResponse.json({ message:"Invalid token"}, { status: 400 });
    }
    console.log(user) 
    if(user.forgotPasswordExpiry < Date.now()){
     return  NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    user.forgotPasswordToken = undefined ;
    user.forgotPasswordExpiry = undefined ;
    user.password = password ;
    await user.save();
    return NextResponse.json({ message: "Password reset successfully"  } ,   { status : 200 });
  } catch (error : any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}