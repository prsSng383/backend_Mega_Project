// we need same format every time we connect to DB , using try-catch || Promises and asyc await , SO here we are Wrapping the function 
// which can be used later.
//Higher Order Functions are functions that accepts functions as parameter.



const asyncHandler = (requestHandler) =>{

   return (req , res , next) => {
        Promise.resolve( requestHandler(req,res,next)).catch((err) => next(err))
    }
}



export {asyncHandler}





// Explanation of the below code.
// const asyncHandler = (func) => {
//     async(req,res,next) =>{}
//        } 


// ONE WAY OF DOING THE WRAPPING USING 'try-catch'.

// const asyncHandler = (func) => async(req,res,next) =>{
//     try {
        
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }