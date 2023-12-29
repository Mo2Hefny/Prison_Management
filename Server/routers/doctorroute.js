import  {Router } from "express";
import doctorcontroller from "../controllers/doctor.js";
import authMiddlewaredoc from "../middlewares/authmiddledoctor.js";
const doctorrouter=Router();

doctorrouter.post("/",doctorcontroller.login);
doctorrouter.get('/',authMiddlewaredoc,doctorcontroller.aftertoken)
// Medical
doctorrouter.get("/all_records",doctorcontroller.getallmedicalrecords) //stored proc
doctorrouter.post("/medical_record",doctorcontroller.getmedicalrecord)
doctorrouter.post("/getdoctorrecords",doctorcontroller.getdoctorrecords)
doctorrouter.post("/getrecordtreatments",doctorcontroller.getRecordtreatments)
doctorrouter.get("/getAllTreatments",doctorcontroller.getAllTreatments)// stored proc
doctorrouter.post("/prisonercond",authMiddlewaredoc,doctorcontroller.selectprisonercond)
//no update insert



export default doctorrouter