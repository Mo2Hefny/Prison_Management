import  { Router } from "express";
import admincontroller from "../controllers/adminsitrator.js"
import authMiddleware from "../middlewares/authmiddleAdmin.js";
const adminrouter=Router();

adminrouter.post("/",admincontroller.login);
adminrouter.get('/',authMiddleware,admincontroller.aftertoken)
// Prisoner
adminrouter.get('/prisoner',admincontroller.selectallprisoners)
adminrouter.post('/prisoner',authMiddleware,admincontroller.insertprisoner)
adminrouter.post('/releaseprisoner',authMiddleware,admincontroller.releaseprisoner)
adminrouter.post("/updateprisoner",admincontroller.updateprisoner)
adminrouter.get("/offenses_noprisoner",admincontroller.getoffensesnoprisoner)
adminrouter.post("/prisonerid",admincontroller.getprisonerbyid)
adminrouter.get("/getallPrisonerCondition",admincontroller.getallPrisonerCondition)
adminrouter.get("/getoffensesonprisoner",admincontroller.getoffensesbyprisoner)
adminrouter.post("/prisoneroffenses",authMiddleware,admincontroller.prisoneroffenses)
// Staff
adminrouter.get("/getallstaff",admincontroller.getallstaff)
adminrouter.get("/getstaffbyid",admincontroller.getstaffbyid)
adminrouter.get("/getsupervisors",admincontroller.getsupervisors)
adminrouter.post('/staff',authMiddleware,admincontroller.addstaff)
adminrouter.get("/doctors",authMiddleware,admincontroller.selectdoctors)
adminrouter.post("/dbi",authMiddleware,admincontroller.selectdoctorsbyid)
// Medical
adminrouter.get("/all_records",admincontroller.getallmedicalrecords)
adminrouter.post("/medical_record",admincontroller.getmedicalrecord)
adminrouter.post("/getdoctorrecords",admincontroller.getdoctorrecords)
adminrouter.post("/getrecordtreatments",admincontroller.getRecordtreatments)
adminrouter.get("/getAllTreatments",admincontroller.getAllTreatments)
adminrouter.post("/prisonercond",authMiddleware,admincontroller.selectprisonercond)
// Prison Units
adminrouter.get("/getblockid",admincontroller.getprisonblocksbyid)
adminrouter.get("/getcellbyid",admincontroller.getcellbyid)
adminrouter.get("/getcellsblock",admincontroller.getcellsforblocks)
adminrouter.get("/getprisonersincell",admincontroller.getprisonersincell)
adminrouter.get("/getnumprisonersincell",admincontroller.getnumberprisonersincell)
// Visitors
adminrouter.get("/getallvisitation",admincontroller.getallvisitations)
adminrouter.get("/getAllVisitors",admincontroller.getAllVisitors)
export default adminrouter