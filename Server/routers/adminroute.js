import  { Router } from "express";
import admincontroller from "../controllers/adminsitrator.js"
import authmiddleAdmin from "../middlewares/authmiddleAdmin.js";
const adminrouter=Router();

adminrouter.post("/",admincontroller.login);
adminrouter.get('/',authmiddleAdmin,admincontroller.aftertoken)
// Prisoner
adminrouter.get('/prisoner',admincontroller.selectallprisoners) //stored proc
adminrouter.post('/prisoner',authmiddleAdmin,admincontroller.insertprisoner)
adminrouter.post('/releaseprisoner',authmiddleAdmin,admincontroller.releaseprisoner)
adminrouter.post("/updateprisoner",admincontroller.updateprisoner)
adminrouter.get("/offenses_noprisoner",admincontroller.getoffensesnoprisoner)//stored proc
adminrouter.post("/prisonerid",admincontroller.getprisonerbyid) 
adminrouter.get("/getallPrisonerCondition",admincontroller.getallPrisonerCondition)
adminrouter.get("/getoffensesonprisoner",admincontroller.getoffensesbyprisoner)
adminrouter.post("/prisoneroffenses",authmiddleAdmin,admincontroller.prisoneroffenses)
// Staff
adminrouter.get("/getallstaff",admincontroller.getallstaff) //stored proc
adminrouter.get("/getstaffbyid",admincontroller.getstaffbyid)
adminrouter.get("/getsupervisors",admincontroller.getsupervisors) //stored proc
adminrouter.post('/staff',authmiddleAdmin,admincontroller.addstaff)
adminrouter.get("/doctors",authmiddleAdmin,admincontroller.selectdoctors) //stored proc
adminrouter.post("/dbi",authmiddleAdmin,admincontroller.selectdoctorsbyid)
// Medical
adminrouter.get("/all_records",admincontroller.getallmedicalrecords) //stored proc
adminrouter.post("/medical_record",admincontroller.getmedicalrecord)
adminrouter.post("/getdoctorrecords",admincontroller.getdoctorrecords)
adminrouter.post("/getrecordtreatments",admincontroller.getRecordtreatments)
adminrouter.get("/getAllTreatments",admincontroller.getAllTreatments)// stored proc
adminrouter.post("/prisonercond",authmiddleAdmin,admincontroller.selectprisonercond)
// Prison Units
adminrouter.get("/getAllPrisonBlocks",admincontroller.getAllPrisonBlocks)
adminrouter.post("/getblockid",admincontroller.getprisonblocksbyid)
adminrouter.post("/getcellbyid",admincontroller.getcellbyid)
adminrouter.post("/getcellsblock",admincontroller.getcellsforblocks)//stored proc
adminrouter.post("/getprisonersincell",admincontroller.getprisonersincell)
adminrouter.post("/getnumprisonersincell",admincontroller.getnumberprisonersincell)
// Visitors
adminrouter.get("/getallvisitation",admincontroller.getallvisitations)
adminrouter.get("/getAllVisitors",admincontroller.getAllVisitors)  //stored proc
//adminrouter.post("/visitationbyid",admincontroller)  //just added
export default adminrouter