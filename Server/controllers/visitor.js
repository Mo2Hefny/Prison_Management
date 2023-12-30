import db from "../db.js"
import jwt from "jsonwebtoken"
const visitorcontroller={
    signup:async(req,res)=>{
        let ssn=req.body.ssn;
        const {fname,lname,bd,adress}=req.body;
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
                if(data && data[0] && data[0]['count(*)'] != 0)
                {
                    return res.json(`you have already signed up,login please`);
                }
                const q2=`insert into visitor(Fname,Lname,SSN,Bdate,address)  values ('${fname}','${lname}',${ssn},'${bd}','${adress}')`;
                try{
                db.query(q2,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                    const q3=`select visitorid from visitor where SSN=${ssn}`;
                    db.query(q3,(error,data)=>{
                        if(error)
                        {
                            return res.json({error});
                        }
                        idc=data[0];
                        const token = jwt.sign(
                            { id: idc},
                            process.env.JWT_SECRET,
                            {
                              expiresIn: "1h",
                            }
                          );
                          res.json({ message: `welcome mr/mrs ${fname} `, token });
                    });
                })
                }
                catch(err)
                {
                    return res.json({err});
                }
            }
        });
    },

    login:async(req,res)=>{
        let ssn=req.body.ssn;
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
                    return res.json("you need to sign up,please try again ");
                }
                const q3=`select visitorid from visitor where SSN=${ssn}`;
                db.query(q3,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                    else
                    {
                        idc=data[0].visitorid;
                        const token = jwt.sign(
                            { id: idc},
                            process.env.JWT_SECRET,
                            {
                              expiresIn: "1h",
                            }
                          );
                          res.json({ message: `welcome`, token });
                    }
                });
            }
        });
    },


    aftertoken:(req, res) => {
    try {
        res.status(200).json({ visitor: req.visitor });
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
      addvisit: async (req, res) => {
        let ssn=req.body.ssn
        let date=req.body.date
        const q=`select pid from prisoner where SSN=${ssn}`
        db.query(q, (error, data) => {
          if (error) {
            return res.json({ error });
          } 
          else {
            const q2=`insert into visitations(prisonerid,visitorid,visitdate,attended) values(${data[0].pid},${req.visitor.visitorid},'${date}',0)`;
            db.query(q2, (error, data) => {
              if (error) {
                return res.json({ error });
              } 
              else {
                return res.json("added visit");
                
              }
            });
          }
        });
      },
      getmyvisits: async (req, res) => {
        const q = `Select concat(prisoner.fname," " , prisoner.lname) as "Prisoner Name" , prisonerid as "Prisoner id", visitor.visitorid as "Visitor id", visitdate as "Visit date" ,
        attended, concat(visitor.Fname, " " ,visitor.Lname) as "Visitor Name"
        from visitations, visitor, prisoner where prisonerid = pid and visitor.visitorid = visitations.visitorid and visitor.visitorid=${req.visitor.visitorid}`;
        db.query(q, (error, data) => {
          if (error) {
            return res.json({ error });
          } 
          else {
           return res.json(data);
          }
        });
      },
}

export default visitorcontroller