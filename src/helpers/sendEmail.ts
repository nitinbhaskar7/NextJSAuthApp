import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '@/models/user.model';
import { connectDB } from '@/dbConnect/connectDB';

await connectDB() ;

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d817ed7009ced6",
      pass: "0f91ffc1cdfb33"
    }
  });

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail( mailType : string , email : string ) {
  // send mail with defined transport object
    try {
        let mailContent = ""
    
        const user = await User.findOne({email}) ;

       
        
        const verifyToken = await bcrypt.hash(email , 10 ) ;
        
      
        await user.save() ;

    
    
    
        if(mailType === "VERIFY"){
          user.verifyToken = verifyToken ; 
          user.verifyTokenExpiry = Date.now() + 10 * 60 * 1000 ;
            mailContent = `
            <h1> Welcome to our app </h1>
            <p> You have successfully signed up to our app </p>
            <p> Please click on the link below to verify your email </p>
            <a href="${process.env.DOMAIN!}/verify?token=${verifyToken}"> Verify Email </a>
            `
        }

        else if(mailType === "FORGOT"){
          user.forgotPasswordToken = verifyToken ; 
          user.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000 ;
            mailContent = `
            <h1> Forgot Password </h1>
            <p> You have requested to reset your password </p>
            <p> Please click on the link below to reset your password </p>
            <a href="${process.env.DOMAIN!}/reset-password?token=${verifyToken}"> Reset Password </a>
            `
        }

        else{
            mailContent ="" ;
        }
        await user.save() ;
      const info = await transport.sendMail({
        from: 'nitin@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: mailContent, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      //
    } catch (error : any) {
        console.log(error.message)       
    } 
}
