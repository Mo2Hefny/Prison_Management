import db from "../db.js"
import jwt from "jsonwebtoken"
const doctorcontroller={
    login:async(req,res)=>{
        let password=req.body.password;
        let idc=req.body.id;
        const q=`select count(*) from doctor where doctor_id=${idc}`;
        db.query(q,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                if(!data[0])
                {
                    return res.json("doctor doesn't exist");
                }
                const q2=`select password from staff where staff_id=${idc}`;
                db.query(q2,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                    else
                    {
                        if(data[0].password != password)
                        {
                            return res.json("wrong password!!");
                        }
                        const token = jwt.sign(
                            { id: idc},
                            process.env.JWT_SECRET,
                            {
                              expiresIn: "1h",
                            }
                          );
                          res.status(200).json({ message: "Logged in successfully", token });
                    }
                });
            }
        });
       
    },
    aftertoken:(req, res) => {
    try {
        res.status(200).json({ doctor: req.doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching your data." });

    }},
    getallmedicalrecords: async (req, res) => {
        const q = `call getmedicalrecord`;
        try {
          // try catch for handling errors
          db.query(q, (error, data) => {
            // execute query
            if (error) {
              return res.json({ error });
            } else {
              return res.json(data[0]); // ok : recieved data
            }
          });
        } catch (err) {
          return res.json({ err }); // say what is the error
        }
      },
      getmedicalrecord: async (req, res) => {
        let record_id = req.body.record_id; // to be read from the front end
        let prisonerid = req.body.prisonerid;
        const q = `Select m.recordid as "Record id", p.pid as "Prisoner id", concat(p.fname," ",p.lname) as "Prisoner Name",
                                concat(s.fname," ",s.lname) as "Staff name" , m.updatedate from medical_record m natural join prisoner p 
                                    join staff s on staff_id = doctorid 
                                    where recordid= ? and p.pid = ?`;
        try {
          // try catch for handling errors
          db.query(q, [record_id, prisonerid], (error, data) => {
            // execute query
            if (error) {
              return res.json({ error });
            } else {
              return res.json(data); // ok : recieved data
            }
          });
        } catch (err) {
          return res.json({ err }); // say what is the error
        }
      },
      getdoctorrecords: async (req, res) => {
        let docid = req.body.doctorid;
        const q = `Select concat(fname, " ",lname) as "Prisoner name", pid as "Prisoner id", recordid as "Record id",
                            updatedate from prisoner natural join
                                medical_record join doctor on doctor_id = doctorid where doctorid = ?`; // formulate query
        try {
          // try-catch for error handling
          db.query(q, [docid], (error, data) => {
            // set the block id
            if (error) return res.json({ error }); // error occured
            else return res.json(data); // return data if a ll good
          });
        } catch (
          err // catch block
        ) {
          return res.json({ err });
        }
      },
      getRecordtreatments: async (req, res) => {
        let recordid = req.body.recordid;
        let pid = req.body.pid;
        const q = `Select t.drugname as "Drug Name", t.doses as "Drug Doses", r.doses as "Admission doses" from record_treatments as r natural join medical_record join treatments t on t.drugname = r.drugname WHERE  r.prisonerid = ? AND r.recordid = ?;`; // formulate query
        try {
          // try-catch for error handling
          db.query(q, [pid, recordid], (error, data) => {
            if (error) {
              return res.json({ error });
            } else {
              return res.json(data);
            }
          });
        } catch (err) {
          return res.json({ err });
        }
      },
      getallPrisonerCondition: async (req, res) => {
        const q = `Select c.pid as "Prisoner id", concat(fname, " ",lname) as "Prisoner name" , conditionname as "Condition name", severity as "Severity" from prisoner_condition c natural join prisoner p`; // formulate query
        try {
          // try-catch for error handling
          db.query(q, (error, data) => {
            if (error) {
              return res.json({ error });
            } else {
              return res.json(data);
            }
          });
        } catch (err) {
          return res.json({ err });
        }
      },
      selectprisonercond: async (req, res) => {
        let id = req.body.id;
    
        const q1 = `select * from prisoner_condition where pid=${id}`;
        try {
          db.query(q1, (error, data) => {
            if (error) {
              return res.json({ error });
            } else {
              return res.json(data);
            }
          });
        } catch (err) {
          return res.json({ err });
        }
      },

      getAllTreatments: async (req, res) => {
        const q = `call getAllTreatments`; // formulate query
        try {
          // try-catch for error handling
          db.query(q, (error, data) => {
            if (error) {
              return res.json({ error });
            } else {
              return res.json(data[0]);
            }
          });
        } catch (err) {
          return res.json({ err });
        }
      },



}

export default doctorcontroller