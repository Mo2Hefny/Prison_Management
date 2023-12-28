import  { Router } from "express";
import admincontroller from "../controllers/adminsitrator.js"
import authMiddleware from "../middlewares/authmiddleAdmin.js";
const adminrouter=Router();

adminrouter.post("/",admincontroller.login);
adminrouter.get('/',authMiddleware,admincontroller.aftertoken)
adminrouter.get('/prisoner',admincontroller.selectallprisoners)
adminrouter.post('/prisoner',authMiddleware,admincontroller.insertprisoner)
adminrouter.post('/staff',authMiddleware,admincontroller.addstaff)
adminrouter.post('/releaseprisoner',authMiddleware,admincontroller.releaseprisoner)
adminrouter.post("/staff",authMiddleware,admincontroller.addstaff)
adminrouter.get("/medical_record",admincontroller.getmedicalrecord)
adminrouter.get("/all_records",admincontroller.getallmedicalrecords)
adminrouter.get("/offenses_noprisoner",admincontroller.getoffensesnoprisoner)
adminrouter.post("/prisonerid",admincontroller.getprisonerbyid)
adminrouter.get("/getblockid",admincontroller.getprisonblocksbyid)
adminrouter.get("/getcellbyid",admincontroller.getcellbyid)
adminrouter.get("/getcellsblock",admincontroller.getcellsforblocks)
adminrouter.get("/getprisonersincell",admincontroller.getprisonersincell)
adminrouter.get("/getnumprisonersincell",admincontroller.getnumberprisonersincell)
adminrouter.get("/getallvisitation",admincontroller.getallvisitations)
adminrouter.get("/getdoctorrecords",admincontroller.getdoctorrecords)
adminrouter.post("/updateprisoner",admincontroller.updateprisoner)
adminrouter.get("/getoffensesonprisoner",admincontroller.getoffensesbyprisoner)
adminrouter.get("/getstaffbyid",admincontroller.getstaffbyid)
adminrouter.get("/getallstaffid",admincontroller.getallstaff)
adminrouter.get("/getrecordtreatments",admincontroller.getRecordtreatments)
adminrouter.get("/getallPrisonerCondition",admincontroller.getallPrisonerCondition)
export default adminrouter