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
adminrouter.get("/allOffenses",admincontroller.getAllOffenses)
adminrouter.post("/offensesById",admincontroller.getOffensesById)
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
adminrouter.get("/getAllPrisonBlocks",admincontroller.getAllPrisonBlocks)
adminrouter.get("/getAllPrisonBlocksnotmax",admincontroller.getAllPrisonBlocksnotmax)
adminrouter.post("/getblockid",admincontroller.getprisonblocksbyid)
adminrouter.post("/getcellbyid",admincontroller.getcellbyid)
adminrouter.post("/getcellsblock",admincontroller.getcellsforblocks)
adminrouter.get("/getAllCells",admincontroller.getAllCells)
adminrouter.post("/getprisonersincell",admincontroller.getprisonersincell)
adminrouter.post("/getnumprisonersincell",admincontroller.getnumberprisonersincell)
adminrouter.post("/insertCell",authMiddleware,admincontroller.insertCell)
adminrouter.post("/insertBlock",authMiddleware,admincontroller.insertBlock)
adminrouter.post("/deleteblock",authMiddleware,admincontroller.deleteblock)
adminrouter.post("/deleteCell",authMiddleware,admincontroller.deleteCell) 
// Visitors
adminrouter.get("/getallvisitation",admincontroller.getallvisitations)
adminrouter.get("/getAllVisitors",admincontroller.getAllVisitors)
// Prison Programs
adminrouter.get("/getallPrograms",authMiddleware,admincontroller.getallPrograms)
adminrouter.get("/getallLabour",authMiddleware,admincontroller.getallLabour)
adminrouter.get("/getallParole",authMiddleware,admincontroller.getallParole)
adminrouter.get("/getallRehab",authMiddleware,admincontroller.getallRehab)
export default adminrouter