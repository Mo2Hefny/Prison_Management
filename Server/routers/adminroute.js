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
adminrouter.get("/all_records",admincontroller.getallmedicalrecords)
adminrouter.post("/medical_record",admincontroller.getmedicalrecord)
adminrouter.get("/offenses_noprisoner",admincontroller.getoffensesnoprisoner)
adminrouter.post("/prisonerid",admincontroller.getprisonerbyid)
adminrouter.get("/getblockid",admincontroller.getprisonblocksbyid)
adminrouter.get("/getcellbyid",admincontroller.getcellbyid)
adminrouter.get("/getcellsblock",admincontroller.getcellsforblocks)
adminrouter.get("/getprisonersincell",admincontroller.getprisonersincell)
adminrouter.get("/getnumprisonersincell",admincontroller.getnumberprisonersincell)
adminrouter.get("/getallvisitation",admincontroller.getallvisitations)
adminrouter.post("/getdoctorrecords",admincontroller.getdoctorrecords)
adminrouter.post("/updateprisoner",admincontroller.updateprisoner)
adminrouter.get("/getoffensesonprisoner",admincontroller.getoffensesbyprisoner)
adminrouter.get("/getstaffbyid",admincontroller.getstaffbyid)
adminrouter.get("/getallstaff",admincontroller.getallstaff)
adminrouter.post("/getrecordtreatments",admincontroller.getRecordtreatments)
adminrouter.get("/getallPrisonerCondition",admincontroller.getallPrisonerCondition)
adminrouter.get("/getsupervisors",admincontroller.getsupervisors)
adminrouter.get("/doctors",authMiddleware,admincontroller.selectdoctors)
adminrouter.post("/dbi",authMiddleware,admincontroller.selectdoctorsbyid)
adminrouter.post("/prisonercond",authMiddleware,admincontroller.selectprisonercond)
adminrouter.post("/prisoneroffenses",authMiddleware,admincontroller.prisoneroffenses)
export default adminrouter