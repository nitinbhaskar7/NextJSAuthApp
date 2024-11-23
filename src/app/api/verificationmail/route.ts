import User from "@/models/user.model";
import { connectDB } from "@/dbConnect/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/sendEmail";
await connectDB();


export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        await sendMail("FORGOT", email);
        return NextResponse.json({ message: "Reset password mail sent" }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}