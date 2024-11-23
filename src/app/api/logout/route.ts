// Simple logout by flusgin out the token 
import { NextResponse , NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    try {

        const res =  NextResponse.json({
            message : "Logout success",
        } , {status   : 200})

        res.cookies.set("token" , "" , {httpOnly : true}) 
        return res

    } catch (error) {
        console.log(error)
    }
}
 