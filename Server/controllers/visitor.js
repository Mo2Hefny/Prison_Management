import db from "../db.js"
import jwt from "jsonwebtoken"
const visitorcontroller={
    login:async(req,res)=>{
        let ssn=req.body.ssn;
        const {fname,lname}=req.body;
        let exist=false;
        let idc;
        const q=`select count(*) from visitor where SSN=${ssn}`;
        db.query(q,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                if(data && data[0] && data[0]['count(*)'] == 0)
                {
                    exist=false;
                }
                if(!exist)
                {
                    const q=`insert into visitor(Fname,Lname,SSN)  values (${fname},${lname},${ssn})`;
                try{
                db.query(q,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                })
                }
                catch(err)
                {
                    return res.json({err});
                }
                }
                const q2=`select visitorid from visitor where SSN=${ssn}`;
                db.query(q2,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                    else
                    {
                        idc=data[0];
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
        res.status(200).json({ admin: req.admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching your data." });

    }},
}

export default visitorcontroller