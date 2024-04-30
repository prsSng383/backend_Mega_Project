import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
// it is a pre-existing Node module need not to insall seperatelly . 
//In Node.js, the fs (File System) module provides an API for interacting with the file system on your computer.

cloudinary.config({ 
  cloud_name: process.env.API_CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

// Creating a function that will ask for the path of the local file and it will uplaod the local file , if file get's uplaoded
// successfuly then unlink the file(dlt)\

const uploadonCloudinary = async(localFilePath) =>{
    try {
        if (!localFilePath) return null
        // uplaod the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
          
        })
              
             console.log("file is successfully uploaded: ", response.url );
             fs.unlinkSync(localFilePath);
             return response;

    } catch (error) {
        //removing the locally saved temporary file as the upload operation got failed.
        fs.unlinkSync(localFilePath);
        return null;
    }
}


export {uploadonCloudinary};