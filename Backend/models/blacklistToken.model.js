import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
})

const blacklistTokenModel = mongoose.model('BlacklistToken', blackListTokenSchema)

export default blacklistTokenModel