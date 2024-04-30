// require('dotenv').config({path:'./'}) -> ONE WAY for .env
// Second way import , make changes in package.json->dev : -r dotenv/config --experimental-json-modules , 
import dotenv from "dotenv"
// impppp -> 1. While stablishing the connection to the DB errors can occur . Use try{}catch() every time.
//           2. Whenever there is connection btw DB it takes time bcs"DB is setuped in different continents- basically it takes time to talk to DB so use"- "async-await" 
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({path: './.env'})

//connectDB() , makes the conenction with the server.
// .then() -> help to run the server .
// .cath() -> throw the error if any  error is catched.
// connectDB then run the server catch if any error occured.
connectDB().then(()=>{ 
    
    app.on('error',()=>{console.log("Error (dfBM): ",error); throw error  }) 
                         
//  to check if the server is getting response --->  app.get('/',(req,res)=>{ res.send("Hello world") })

    app.listen(process.env.PORT, () =>{ console.log(`Server is running at port: ${process.env.PORT}`)} )

    }).catch((err)=>{ console.log("Error conencting to DB" , err)})

 






// This is the one way where you have made the connection to DB + hosted the server in the same file.
/*import express from 'express';

const app = express();

; (async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on('error',(error)=>{
        console.log("Error" , error)
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
       })


    } catch (error) {
        console.log("ERROR: ",error)
        throw err
    }
})() */