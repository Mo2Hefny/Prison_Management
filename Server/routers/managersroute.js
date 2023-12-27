import  {Router } from "express";
import managercontroller from "../controllers/managers.js";
import authMiddleware from "../middlewares/authmiddleAdmin.js";
const managerrouter=Router();

managerrouter.post("/",managercontroller.login);
managerrouter.get('/',authMiddleware,managercontroller.aftertoken)

export default managerrouter