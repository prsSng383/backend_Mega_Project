import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import multer from "multer";
// creating controllers for registration page.
const registerUser = asyncHandler(async(req ,res) =>{
         //Flow of the logic we need for user registeration.
         // 1. get user details from frontend(postman).
         // 2. validation (checking the requirements of the fileds)
         // 3. check if user already exists. username,email
         // 4. check for images , check for avatar.
         // 5. upload them to cloudinary.
         // 6. create user object - create entry in db(when the files and data are send to mongodb they are send as objects ).
         // 7. remove password and refresh token field from response.
         // 8. check for user creation
         // 9 return response

         // data can come from -> url , json , form.
         // 1. accessing the details from the useModel.
            const {fullname,username,email,password} = req.body
            console.log(req.body);
           
        // go to  poatman app and on the url , choose body - raw data and push the email in json format.  

        // 2. validations
        //Normal way-
        // if (username === "") {
        //     throw new ApiError(400, "username is required")
        // }
        
        // Advance way- 
        //overall, the code checks if any of the fields in the array are empty or contain only whitespace. If any field meets this condition, the .some() method returns true; otherwise, it returns false.
           if ([username,email,fullname,password].some((field)=>field?.trim()==="")) {
              throw new ApiError(400,"all fields are required")
           }// you can add more validations as needed.
       
        // 3. User existence
        const existedUser = await User.findOne({
            $or : [{ username } ,{ email }]
        })   
        if(existedUser){throw new ApiError(409 , "User with same username or email already exit's")}

        // 4. check avatar
        // req.body given by express
        // req.files giving access to files that are uplaoded through Front-end OR postman.
        console.log(req.files);
       const avatarLocalPath =  req.files?.avatar[0]?.path;
       console.log(avatarLocalPath);


       //const coverImageLocalPath =  req.files?.coverImage[0]?.path;
           let coverImageLocalPath;
           if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
                     coverImageLocalPath = req.files.coverImage[0].path;
           }

       if (!avatarLocalPath) {
           throw new ApiError(400 , "Avatar file is required")
        }
 
        //5. upload to cloudinary
       const avatar = await uploadonCloudinary(avatarLocalPath)
       console.log(avatar);
       const coverImage = await uploadonCloudinary(coverImageLocalPath)

       if (!avatar) {
        throw new ApiError(400 , "Avatar file is required after") 
       }

       //6. make the entry in the mongoDb.
         const user = await User.create({
            username:username.toLowerCase(),
            password,
            email,
            fullname,
            avatar:avatar.url,
            coverImage: coverImage?.url || ""

        })
        // if user is creatd so the mongodb will asign the id's to each parameters , we can access the user._id and use select() method to remove the fields    
        const createdUser = await User.findById(user._id).select(
            
        )
        // if use is not created then throw the error
        if(!createdUser){
            throw new ApiError(500 , "Something went wrong while registering the user. " )
        }
            
        // now return the response in structured format use ApiResponse helper.
        return res.status(201).json(
            new ApiResponse(200,createdUser,"User registered Successfuly")
        )

})


export {registerUser}


/* 1. Got this output after pushing the required properties from Postman.
   {
    "statusCode": 200,
    "data": "User registered Successfuly",
    "message": {
        "_id": "663092ad46bd606e68af8228",
        "username": "prsinras",
        "email": "pa@sn.com",
        "fullname": "paras singh",
        "avatar": "http://res.cloudinary.com/drmfbbhyd/image/upload/v1714459306/swrj5smfjb8kiamjztfl.png",
        "coverImage": "http://res.cloudinary.com/drmfbbhyd/image/upload/v1714459307/fhkzpk2runxn0a5ov4k5.png",
        "watchHistory": [],
        "createdAt": "2024-04-30T06:41:49.264Z",
        "updatedAt": "2024-04-30T06:41:49.264Z",
        "__v": 0
    },
    "success": true
}
  2. THIS IS THE OUTPUT FROM THE MONGODB:->

{"_id":{"$oid":"6630975633e495102c2ad8f7"},
"username":"prsinrass",
"email":"pa@sin.com",
"fullname":"paras singh",
"avatar":"http://res.cloudinary.com/drmfbbhyd/image/upload/v1714460498/d78wbaior8w1ivt59mof.png",
"coverImage":"http://res.cloudinary.com/drmfbbhyd/image/upload/v1714460500/imkoe9n57mlbkpkv4z3w.png",
"watchHistory":[],
"password":"$2b$10$j00mlvoULt1RnKZHTBw4.e5mM7Dubfint4g6DtePH1apGRB.U/qjK",
"createdAt":{"$date":{"$numberLong":"1714460502273"}},
"updatedAt":{"$date":{"$numberLong":"1714460502273"}},
"__v":{"$numberInt":"0"}}

*/