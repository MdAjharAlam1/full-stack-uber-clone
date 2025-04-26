import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import { captainCreate } from "../services/captain.services.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";


export const captainRegister = async(req,res,next)=>{
    try {
        const errros = validationResult(req)
        if(!errros.isEmpty()){
            return res.status(401).json({
                errros: errros.array()
            })
        }
        const {fullName, email , password,vehicle }  = req.body
        const captainAlreadyExist = await captainModel.findOne({email:email})
        if(captainAlreadyExist){
            return res.status(402).json({
                message:'Account Already Exists'
            })
        }
        const hashedPassword = await captainModel.hashPassword(password)
        const captain = await captainCreate({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email: email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })

        const token = await captain.generateAuthToken()
        res.status(200).json({token, captain})
    } catch (error) {
        console.log('Error from captain register controllers',error.message)
        return res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export const captainLogin = async(req,res,next)=>{
    try {
        const errros = validationResult(req)
        if(!errros.isEmpty()){
            return res.status(403).json({
                errors:errros.array()
            })
        }
        const{email , password} = req.body
        // console.log(email,password)
        const captain = await captainModel.findOne({email:email}).select('+password')
        // console.log(captain)
        if(!captain){
            return res.status(401).json({
                message:"Invalid Email or Password"
            })
        }
        const isMatchPassword = await captain.comparePassword(password)
        // console.log(isMatchPassword)
        if(!isMatchPassword){
            return res.status(403).json({
                message:"Invalid Email or Password"
            })
        }

        const token = await captain.generateAuthToken()
        // console.log(token)

        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            maxAge:3600000
        }).status(200).json({
            token,
            captain
        })
        
    } catch (error) {
        console.log('Error from captain login controllers', error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}

export const getCaptainProfile = async(req,res,next)=>{
    try {
        const captain = req.captain
        console.log(captain)
        
        return res.status(200).json({
            captain
        })
    } catch (error) {
        console.log('Error from captain profile controller',error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

}

export const captainLogout = async(req,res,next)=>{
    try {
        res.clearCookie('token')
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        await blacklistTokenModel.create({token})
        return res.status(200).json({
            message:"Logout Successfully"
        })
    } catch (error) {
        console.log("Error from captain logout controller",error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}