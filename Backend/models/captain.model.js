import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            trim:true,
            minlength:[3,'first Name must be atleast 3 characters long']
        },
        lastName:{
            type:String,
            trim:true,
            minlength:[3,'last Name must be atleast 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,'Please enter valid email'],
        minlength:[5,'email must be atleast 5 character long']
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8, 'Password must be atleast 8 characters long']
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be atleast 3 characters long']
        },
        vehicleType:{
            type:String,
            enum:['car','motorcycle','auto']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be atleast 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be atlest 1']
        }
    }
})

captainSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}   

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema)

export default captainModel