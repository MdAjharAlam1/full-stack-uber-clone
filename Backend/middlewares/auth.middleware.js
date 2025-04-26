import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import blacklistTokenModel from '../models/blacklistToken.model.js';


export const authUser= async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // console.log(token, "Ajhar")
        if(!token){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }
        const blackListToken = await blacklistTokenModel.findOne({token:token})
        if(blackListToken){
            return res.status(403).json({
                message: "Unauthorized"
            })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(403).json({
                message:'Unauthorized'
            })
        }
        const user = await userModel.findById({_id:decode._id})
        // console.log(user)
        req.user = user
        return next()
    } catch (error) {
        console.log('Error from auth middleware',error.message)
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}