import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            trim:true,
            minlength:[3,'first name must be atleast 3 characters long']
        },
        lastName:{
            type:String,
            trim:true,
            minlength:[3,'last name must be atleast 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be atlest  5 characters long']
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be atleat 8 characters long'],
        select:false
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const  userModel = mongoose.model('User', userSchema)

export default userModel