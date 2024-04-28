import multer from "multer";
// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It is commonly used with Node.js and Express.js to handle file uploads easily.

const storage =  multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null , "./public/temp") // Destination folder for uploaded files
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname) // Use the original file or many options you can rename the file and can store as you like.
    }
})


export const upload = multer({
    storage:storage
})