import { connectDB } from "@/dbConnect/connectDB"; 
import User from "@/models/user.model";
import { NextResponse , NextRequest } from "next/server";
import { ApiError } from "@/helpers/ApiError";

import { sendMail } from "@/helpers/sendEmail";

await connectDB(); 

export async function POST(request: NextRequest) {
  try {
    const { username , email, password } = await request.json() ;
    const user = await User.findOne({ email })
    if(user){
      return NextResponse.json(new ApiError("User already exists", 400), { status: 400 });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
      await sendMail("VERIFY" , email)

    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
  } catch (error : any) {
    return NextResponse.json(new ApiError(error.message, 500), { status: 500 });
  }
}
