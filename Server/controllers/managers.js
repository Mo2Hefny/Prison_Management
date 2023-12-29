import db from "../db.js"
import jwt from "jsonwebtoken"
const managercontroller={
    login:async(req,res)=>{
        let password=req.body.password;
        let idc=req.body.id;
        const q=`select count(*) from staff where staff_id=${idc}`;
        db.query(q,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
            if(data && data[0] && data[0]['count(*)'] == 0)
            {
                return res.json("manager doesn't exist");
            }
            const q2=`select password from staff where staff_id=${idc}`;
            db.query(q2,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                if(data && data[0] && data[0].password != password)
                {
                    return res.json("wrong password!!");
                }
            }
            });
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
    },

    aftertoken:(req, res) => {
    try {
        res.status(200).json({ manager: req.manager });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching your data." });

    }},
    getAllVisitors: async (req, res) => {
        const q = `call selectvisitors`; // formulate query
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
      getallvisitations: async (req, res) => {
        const q = `Select concat(prisoner.fname," " , prisoner.lname) as "Prisoner Name" , prisonerid as "Prisoner id", visitor.visitorid as "Visitor id", visitdate as "Visit date" ,
                    attended, concat(visitor.Fname, " " ,visitor.Lname) as "Visitor Name"
                    from visitations, visitor, prisoner where prisonerid = pid and visitor.visitorid = visitations.visitorid`; // formulate query
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

}

export default managercontroller