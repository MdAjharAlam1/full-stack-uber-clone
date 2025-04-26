import captainModel from "../models/captain.model.js";

export const captainCreate = async({firstName, lastName, email, password, plate, color, capacity,vehicleType})=>{
    if(!firstName || !email || !password || !plate || !color || !capacity || !vehicleType){
        return res.status(403).json({
            message:"All fields are required"
        })
    }

    const captain = await captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain
}