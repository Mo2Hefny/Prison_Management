import db from "../db.js"
import jwt from "jsonwebtoken"
const managercontroller={
    login:async(req,res)=>{
        let password=req.body.password;
        let idc=req.body.id;
        const q=`select count(*) from staff where staff_id=${idc} and staff_type = 1`;
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
            db.query(q2,(error,data2)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                if(data2 && data2[0] && data2[0].password != password)
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
        res.status(200).json({ manager: req.manager });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching your data." });

    }},
    HireStaff : async(req,res)=>{
        var datetime = new Date(); // get the current date and time
        let currentdate = datetime.toISOString().slice(0,10); // take the date part only
        const q=`Select * from visitations natural join visitor where visitdate < ?`; // formulate query
        try // try-catch for error handling
        {
            db.query(q,[currentdate],(error,data)=>{ 
                if(error)
                {
                    return res.json({error});
                }
                else
                {
                    return res.json({message:"Upcoming visits returned successfully."});
                }
            })
        }
        catch(err)
        {
            return res.json({err});
        }
    }    

}

export default managercontroller