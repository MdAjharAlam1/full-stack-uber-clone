import express from 'express'
import {body} from 'express-validator'
import { userRegister,userLogin,getUserProfile, userLogout } from '../controllers/user.controllers.js'
import { authUser } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register',[
    body('email').isEmail().withMessage('Email must be atleast 6 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 8 characters long'),
    body('fullName.firstName').isLength({min:3}).withMessage('first Name must be atleast 3 characters long')

],userRegister);

router.post('/login',[
    body('email').isEmail().withMessage('Email must be atleat 6 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 8 characters long')
],userLogin)

router.get('/Profile',authUser,getUserProfile)
router.get('/logout', userLogout)


export default router