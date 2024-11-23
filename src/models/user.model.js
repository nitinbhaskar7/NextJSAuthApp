import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "username is required"],
        unique : true,
    },
    email : {
        type : String,
        required : [true , "email is required"],
        unique : true,
    },
    password : {
        type : String,
        required : [true , "password is required"],
    },
    role : {
        type : String,
        enum : ["user", "admin"], 
        default : "user",
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : {
        type : String,
    },
    forgotPasswordTokenExpiry : {
        type : Date,
    },
    verifyToken : {
        type : String,
    },
    verifyTokenExpiry : {
        type : Date,
    },


}) ;

userSchema.pre("save", async function(next){
    // Hash the password before saving
if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.models.User ||  mongoose.model("User", userSchema);


export default User