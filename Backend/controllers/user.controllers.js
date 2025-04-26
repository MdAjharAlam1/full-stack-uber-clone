import blacklistTokenModel from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import {createUser} from '../services/user.services.js'
import { validationResult } from "express-validator";

export const userRegister = async(req,res,next)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {fullName, email , password }  = req.body
        const userAlreadyExits = await userModel.findOne({email:email})
        if(userAlreadyExits){
            return res.status(403).json({
                message:"Account Already Exists"
            })
        }
        const hashedPassword = await userModel.hashPassword(password)
        const user = await createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email:email,
            password: hashedPassword
        })
        const token = await user.generateAuthToken()
        
        return res.status(200).json({token, user})
        
    }
    catch(error){
        console.log('Error from Register controller',error.message)
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}

export const userLogin = async(req,res,next)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {email, password} = req.body
        const user = await userModel.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({
                message: 'Invalid Email & Password'
            })
        }
        const isMatchPassword = await user.comparePassword(password)
        if(!isMatchPassword){
            return res.status(400).json({
                message:'Invailid Email & Password'
            })
        }
        const token = await user.generateAuthToken()
        return res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            maxAge:3600000
        }).status(200).json({token,user})
    } catch (error) {
        console.log('Error from login controller',error.message)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
export const getUserProfile = async(req,res,next)=>{
    try {
        const user = req.user
        return res.status(200).json(user)
    } catch (error) {
        console.log('Error from profile controllers',error.message)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const userLogout = async(req,res,next)=>{
    try {
        res.clearCookie('token')
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        await blacklistTokenModel.create({token})
        
        res.status(200).json({
            message:"Logout Sucessfully"
        })
    } catch (error) {
        
    }
}