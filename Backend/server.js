import http from 'http'
import app from './app.js'
import connectDB from './db/db.js'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

connectDB().then(()=>{
    console.log("connected to DB")
    server.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`)
    })
}).catch((error)=>{
    console.log("connected to DB failed",error.message)
})