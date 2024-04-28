import { asyncHandler } from "../utils/asyncHandler.js";

// creating controllers for registration page.
const registerUser = asyncHandler(async(req ,res) =>{
                    res.status(200).json({
                        message: 'ok'
                    })
})


export {registerUser}