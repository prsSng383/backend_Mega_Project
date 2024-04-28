// importing router and deciding path for every controllers. 
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();
// hosting registerUser controller at '/register' path.
router.route("/register").post(registerUser)


export default router