// This helper function will decode the token and return the user id .

import jwt from "jsonwebtoken";


export function getTokendata(token: string) {
    try {
        const decoded:any = jwt.verify(token , process.env.JWT_SECRET!)  ;
        return decoded.id ;
    } catch (error : any) {
       console.log(error.message)
    }
}