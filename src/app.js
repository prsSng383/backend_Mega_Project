// creating the express app here.

// req.params() ->when the data received is through URL. handeled by params.
// cookie-parser , req.cookies()
// CORS -> Cross Origin Resource Sharing.
// app.use() -> for middlewares.
// we have 4-params for -> app.get('/', (error,req,res,next)=>{})

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// Can be used like this only OR we can add more to cors() function read documentation = app.use(cors())
// CORS_ORIGIN -> enter specific URL from where the data is coming.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// for receiving the data as json format and setting the limit so , the site won't crash with unlimited json 
app.use(express.json({
    limit: "16kb"
}))

// for receiving the data through URL
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

// for accessing the images,pdfs and other files publicily accessibles 
app.use(express.static("public"))

// With our server to access OR to perform CRUD operations on someone's else BROWSER.
app.use(cookieParser())

export {app}