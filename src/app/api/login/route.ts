import { NextResponse , NextRequest } from "next/server"; 
import { connectDB } from "@/dbConnect/connectDB";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { ApiError } from "@/helpers/ApiError";
import jwt from "jsonwebtoken";

await connectDB();

export async function POST(request: NextRequest) {
  try {
    const { username , password } = await request.json() ;
    const user = await User.findOne({ username })
    if(!user){
      return NextResponse.json({message : "USER NOT FOUND"}, { status: 420 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return NextResponse.json({message : "incorrect password"}, { status: 410 });
    }

    const token = jwt.sign({ id: user._id  , username  : username , email : user.email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const res = NextResponse.json({ message : "Success Signing in User"  },  { status: 200 });
    res.cookies.set("token", token, {
        httpOnly: true, 
    }) ;
    console.log(res) ;
    return res ;
    // Creating tokens
  } catch (error : any) {
    console.log(error.message)
    return NextResponse.json(new ApiError(error.message, 500), { status: 500 });
  }
}