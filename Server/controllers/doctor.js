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
            }
        });
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
          
    },
    aftertoken:(req, res) => {
    try {
        res.status(200).json({ doctor: req.doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching your data." });

    }},
}

export default doctorcontroller