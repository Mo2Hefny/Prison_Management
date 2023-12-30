import  {Router } from "express";
import managercontroller from "../controllers/managers.js";
import authMiddlewaremanager from "../middlewares/authmiddlemanager.js";
const managerrouter=Router();

managerrouter.post("/",managercontroller.login);
managerrouter.get('/',authMiddlewaremanager,managercontroller.aftertoken)
//visitations
managerrouter.get("/getallvisitation",managercontroller.getallvisitations)
managerrouter.get("/getAllVisitors",managercontroller.getAllVisitors)  //stored proc


//dashbord





//pograms



export default managerrouter