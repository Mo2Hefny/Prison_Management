import  {Router } from "express";
import doctorcontroller from "../controllers/doctor.js";
import authMiddleware from "../middlewares/authmiddleAdmin.js";
const doctorrouter=Router();

doctorrouter.post("/",doctorcontroller.login);
doctorrouter.get('/',authMiddleware,doctorcontroller.aftertoken)

export default doctorrouter