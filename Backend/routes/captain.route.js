import express from 'express'
import {body} from 'express-validator'
import {captainRegister,captainLogin, getCaptainProfile, captainLogout} from '../controllers/captain.controllers.js'
import { authCaptain } from '../middlewares/authCaptain.middleware.js'

const router = express.Router()

router.post('/register',[
    body('email').isEmail().withMessage('Email must be atleast 6 characters long'),
    body('fullName.firstName').isLength({min:3}).withMessage('First Name must be atleast 3 charcters long'),
    body('fullName.lastName').isLength({min:3}).withMessage('last Name must be atleast 3 charcters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Palte must be atleast 3 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be atlest 1'),
    body('vehicle.vehicleType').isIn(['car','auto','motorcycle']).withMessage('Invailid vechile Type')
],captainRegister)

router.post('/login',[
    body('email').isEmail().withMessage('Email must be atleast 6 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
], captainLogin)

router.get('/profile',authCaptain,getCaptainProfile)
router.get('/logout',authCaptain, captainLogout)

export default router