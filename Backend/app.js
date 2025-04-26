import { config } from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.route.js'
import captainRoutes from './routes/captain.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/v1/users',userRoutes)

app.use('/api/v1/captains', captainRoutes)

app.get('/',(req,res)=>{
    res.send('Hello from ajhar ')
})

export default app