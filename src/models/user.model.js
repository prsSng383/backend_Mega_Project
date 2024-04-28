import mongoose , {Schema} from "mongoose";
import bcrypt from 'bcrypt';
//bcrypt.js is a JavaScript library that allows developers to hash passwords using the bcrypt hashing algorithm in Node.js environments. 

import jwt from "jsonwebtoken";
// JWTs are commonly used for authentication and authorization in web applications.
//A JWT consists of three parts: a header, a payload, and a signature, each encoded as Base64. The header typically contains information about the type of token and the hashing algorithm used to create the signature. The payload contains the claims, which are statements about an entity (typically the user) and additional data. The signature is created by encoding the header and payload, and then signing it using a secret key known only to the server. This signature ensures that the token has not been tampered with.


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        index: true
     // to get easily searched , if the info is important and often searchable.
     // but it increasese the load on the server.
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    fullname:{
        type: String,
        required: true,
        trim:true,
        index: true
    },
    avatar:{
        type:String, // cloudinary url
        required: true
    },
    coverImage:{
        type: String
    },
    // array of individual video
    watchHistory:[
        {
            type : Schema.Types.ObjectId,
             ref: 'Video'
        }
    ],
    // keep password as String 
    password:{
        type: String,
        required: [true,"Password is required"]

    },
    refreshToken:{
        type:String
    }

     

},{timestamps:true})


// .pre() function is used to register middleware functions that execute before specific operations are performed on a MongoDB document.
// here 'save' this will run before any document is saved , in this case before password is updated.
//In summary, this middleware ensures that before saving a document with the userSchema, if the password field has been modified, it will be hashed using bcrypt with a cost factor of 10. If the password hasn't been modified, the middleware skips hashing and proceeds to save the document.
// we didn't used arrow function because with that we can not give 'this' to reffer to the objects of userSchema i.e we have used function key word.
userSchema.pre('save', async function (next) {

    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password ,10);
    next()

})

//This code extends a Mongoose schema called userSchema by adding a method named isPasswordCorrect
// this method provides a way to check if a given password matches the hashed password stored in a user document, allowing for authentication in a Node.js application using bcrypt for password hashing.
userSchema.methods.isPasswordCorrect = async function (password) {return await bcrypt.compare(password, this.password)}

// this both method's below generates a JWT containing user information and returns it
userSchema.methods.generateAccessToken = function(){
      return jwt.sign(
        {_id: this._id,
         email: this.email,
         username: this.username,
         fullname: this.fullname   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefereshToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
         
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User',userSchema)


//Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power
//The maximum input length is 72 bytes (note that UTF8 encoded characters use up to 4 bytes) and the length of generated hashes is 60 characters.
