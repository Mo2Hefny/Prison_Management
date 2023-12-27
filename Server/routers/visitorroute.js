import  {Router } from "express";
import visitorcontroller from "../controllers/visitor.js";
import authMiddleware from "../middlewares/authmiddleAdmin.js";
const visitorrouter=Router();

visitorrouter.post("/",visitorcontroller.login);
visitorrouter.get('/',authMiddleware,visitorcontroller.aftertoken)

export default visitorrouter