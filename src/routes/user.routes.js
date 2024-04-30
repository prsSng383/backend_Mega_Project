// importing router and deciding path for every controllers. 
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();
// hosting registerUser controller at '/register' path.
// upload.fields() -> uplaod is the middleware fnc and here it is used for storing the files fields avatar and images.
router.route("/register").post( upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]), 

registerUser)


export default router