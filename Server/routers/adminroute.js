import  {Router } from "express";
import admincontroller from "../controllers/adminsitrator.js"
import authMiddleware from "../middlewares/authmiddleAdmin.js";
const adminrouter=Router();

adminrouter.post("/",admincontroller.login);
adminrouter.get('/',authMiddleware,admincontroller.aftertoken)
adminrouter.get('/prisoner',authMiddleware,admincontroller.selectallprisoners)
adminrouter.post('/prisoner',authMiddleware,admincontroller.insertprisoner)
adminrouter.post('/staff',authMiddleware,admincontroller.addstaff)
adminrouter.post('/releaseprisoner',authMiddleware,admincontroller.releaseprisoner)
adminrouter.post("/staff",authMiddleware,admincontroller.addstaff)
adminrouter.get("/medical_record",admincontroller.getmedicalrecord)
adminrouter.get("/offenses_noprisoner",admincontroller.getoffensesnoprisoner)
adminrouter.get("/prisonerid",authMiddleware,admincontroller.getprisonerbyid)
export default adminrouter