import captainModel from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import jwt from 'jsonwebtoken'

export const authCaptain = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }
        const blackListToken = await blacklistTokenModel.findOne({token:token})
        if(blackListToken){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }
        const captain = await captainModel.findOne({_id:decode._id})
        req.captain = captain
        return next()
    } catch (error) {
        console.log('Error from captain middleware',error)
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}