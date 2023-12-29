import  {Router } from "express";
import visitorcontroller from "../controllers/visitor.js";
import authMiddlewarevisitor from "../middlewares/authmiddlevisitor.js";
const visitorrouter=Router();

visitorrouter.post("/login",visitorcontroller.login);
visitorrouter.post("/signup",visitorcontroller.signup);
visitorrouter.get("/",authMiddlewarevisitor,visitorcontroller.aftertoken)

visitorrouter.get("/getAllVisitors",visitorcontroller.getAllVisitors)  //stored proc

visitorrouter.get("/getallvisitation",authMiddlewarevisitor,visitorcontroller.getmyvisits);
visitorrouter.post("/addvisitation",authMiddlewarevisitor,visitorcontroller.addvisit);

///// 
export default visitorrouter