import { json } from "express";
import db from "../db.js"
import jwt from "jsonwebtoken"
const admincontroller={
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
                    return res.json("admin doesn't exist");
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
                return res.json({ message: "Logged in successfully", token });
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

    selectallprisoners:async(req,res)=>{
        const q="select * from prisoner";
        try{
        db.query(q,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                return res.json({data});
            }
        })
    }
    catch(err)
    {
        return res.json({data});
    }
    },
    insertprisoner:async(req,res)=>{
        let exist=false;
        const q1=`select count(*) from prisoner where SSN=${req.body.ssn}`;
        db.query(q1,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                if (data && data[0] && data[0]['count(*)'] > 0) {
                    exist = true;
                }
            }
            if(exist)
            {
                const q2=`update prisoner set status=1 where SSN=${req.body.ssn}`;
                try{
                db.query(q2,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                    else
                    {
                        return res.json({message:"prisoner already was in,update successfully"});
                    }
                })
                }
                catch(err)
                {
                    return res.json({err});
                }
            }
            else{
            const {ssn,fname,lname,gender,bdate,admission_date,release_date,status,blockid,cellid}=req.body;
            const q3=`insert into prisoner(ssn,fname,lname,gender,bdate,admission_date,release_date,status,blockid,cell_id) values (${ssn},'${fname}','${lname}',${gender},'${bdate}','${admission_date}','${release_date}',${status},${blockid},${cellid} )`;
            try{
            db.query(q3,(error,data)=>{
                if(error)
                {
                    return res.json({error});
                }
                else
                {
                    return res.json({message:"prisoner inserted successfully"});
                }
            })
        }
        catch(err)
        {
            return res.json({err});
        }
    }
        });
    },

    releaseprisoner:async(req,res)=>{
        let idp=req.body.id;
        const q=`update prisoner set status=0 where pid=${idp}`;
        try{
        db.query(q,(error,data)=>{
            if(error)
            {
                return res.json({error});
            }
            else
            {
                return res.json({message:"prisoner released successfully"});
            }
        })
    }
    catch(err)
    {
        return res.json({err});
    }
    },

    addstaff:async(req,res)=>{
        let stafftype=req.body.type;
        const {fn,ln,ssn,bd,hd,superid,salary,shift,status,password}=req.body;
        const q1=`insert into staff(fname,lname,ssn,birthdate,hiredate,supervisor_id,salary,shift,status,password) values ('${fn}','${ln}',${ssn},'${bd}','${hd}',${superid},${salary},${shift},${status},'${password}') `
        try{
            db.query(q1,(error,data)=>{
                if(error)
                {
                    return res.json({error});
                }
                let staffid;
                const q2=`select staff_id from staff where ssn=${ssn}`;
                db.query(q2,(error,data)=>{
                    if(error)
                    {
                        return res.json({error});
                    }
                    else{
                        if(data && data[0])
                        {   
                        let stid=data[0].staff_id;
                            if(stafftype==="doctor")
                            {
                            const q3=`insert into doctor(doctor_id,speciality,years_of_exp) values (${stid},'${req.body.speciality}',${req.body.yoe})`;
                            db.query(q3,(error,data3)=>{
                            if(error)
                            {
                                return res.json({error});
                            }
                            else
                            {
                                return res.json("doctor inserted");
                            }
                            });
                        }
                        else if(stafftype==="guard")
                        {
                            const q3=`insert into guard(guard_id,type,block_id) values (${stid},'${req.body.type}',${req.body.block_id})`
                            db.query(q3,(error,data3)=>{
                            if(error)
                            {
                                return res.json({error});

                            }
                            else{
                                return res.json("guard inserted");
                            }
                            });
                        }
                        return res.json({message:'inserted sucessfully'});
                    }
                }
                });
            })
        }
        catch(err)
        {
            return res.json({err});
        }
    },
    // Ziad updated here.
        getallmedicalrecords : async(req,res)=>{
            const q=`Select m.recordid as "Record id", p.pid as "Prisoner id", concat(p.fname," ",p.lname) as "Prisoner name",
                         concat(s.fname," ",s.lname) as "Staff name" , m.updatedate from medical_record m natural join prisoner p 
                         join staff s on staff_id = doctorid`;
            try // try catch for handling errors
            {
                db.query(q, (error,data)=>{ // execute query
                    if(error)
                    { 
                        return res.json({error});
                    }
                    else
                    {
                        return res.json(data); // ok : recieved data
                    }
                })
            }
            catch(err)
            {
                return res.json({err}); // say what is the error
            }
        },
        getmedicalrecord : async(req,res)=>{
            let record_id = req.body.record_id; // to be read from the front end
            let prisonerid = req.body.prisoner_id;
            const q=`Select m.recordid as "Record id", p.pid as "Prisoner id", concat(p.fname," ",p.lname) as "Prisoner Name",
                        concat(s.fname," ",s.lname) as "Staff name" , m.updatedate from medical_record m natural join prisoner p 
                            join staff s on staff_id = doctorid 
                            where recordid= ? and p.pid = ?`;
            try // try catch for handling errors
            {
                db.query(q,[record_id,prisonerid],(error,data)=>{ // execute query
                    if(error)
                    { 
                        return res.json({error});
                    }
                    else
                    {
                        return res.json(data); // ok : recieved data
                    }
                })
            }
            catch(err)
            {
                return res.json({err}); // say what is the error
            }
        },
            getupcomingvisitations : async(req,res)=>{
                var datetime = new Date(); // get the current date and time
                let currentdate = datetime.toISOString().slice(0,10); // take the date part only
                const q=`Select * from visitations natural join visitor where visitdate > ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[currentdate],(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getpreviousvisitations : async(req,res)=>{
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
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getvisitationsondate : async(req,res)=>{
                let currentdate = datetime.toISOString().slice(0,10); // take the date part only
                const q=`Select * from visitations natural join visitor where visitdate = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[currentdate],(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getallvisitations : async(req,res)=>{
                const q=`Select concat(prisoner.fname," " , prisoner.lname) as "Prisoner Name" , prisonerid as "Prisoner id", visitor.visitorid as "Visitor id", visitdate as "Visit date" ,
                attended, concat(visitor.Fname, " " ,visitor.Lname) as "Visitor Name"
                from visitations, visitor, prisoner where prisonerid = pid and visitor.visitorid = visitations.visitorid`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getoffensesnoprisoner : async(req,res)=>{
                const q=`Select * from offense where offenseid not in (select offenseid from convicted_of)`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getprisonerbyid : async(req,res)=>{
                let pid = req.body.prisonerid;
                const q=`Select * from prisoner where pid = ? `; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[pid],(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getprisonblocksbyid : async(req,res)=>{

                let blockid = req.body.block_id;
                const q=`Select * from cell_block where blockid = ? `; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[blockid],(error,data)=>{  // set the block id
                        if(error)
                            return res.json({error}); // error occured
                        else
                            return res.json(data); // return data if a ll good
                    }) 
                }
                catch(err) // catch block
                {
                    return res.json({err});
                }
            },
            getcellbyid : async(req,res)=>{

                let cellid = req.body.cell_id;
                let blockid = req.body.block_id
                const q=`Select * from cell where cell_id = ? and block_id = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[cellid,blockid],(error,data)=>{  // set the block id
                        if(error)
                            return res.json({error}); // error occured
                        else
                            return res.json(data); // return data if a ll good
                    }) 
                }
                catch(err) // catch block
                {
                    return res.json({err});
                }
            },
            getcellsforblocks : async(req,res)=>{
                let blockid = req.body.block_id
                const q=`Select * from cell where block_id = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[blockid],(error,data)=>{  // set the block id
                        if(error)
                            return res.json({error}); // error occured
                        else
                            return res.json(data); // return data if a ll good
                    }) 
                }
                catch(err) // catch block
                {
                    return res.json({err});
                }
            },
            getprisonersincell : async(req,res)=>{

                let cellid = req.body.cell_id;
                const q=`Select * from prisoner where cell_id = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[cellid],(error,data)=>{  // set the block id
                        if(error)
                            return res.json({error}); // error occured
                        else
                            return res.json(data); // return data if a ll good
                    }) 
                }
                catch(err) // catch block
                {
                    return res.json({err});
                }
            },
            getnumberprisonersincell : async(req,res)=>{

                let cellid = req.body.cell_id;
                const q=`Select count(*) as "Count prisoners" from prisoner where cell_id = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[cellid],(error,data)=>{  // set the block id
                        if(error)
                            return res.json({error}); // error occured
                        else
                            return res.json(data); // return data if a ll good
                    }) 
                }
                catch(err) // catch block
                {
                    return res.json({err});
                }
            },
            getdoctorrecords : async(req,res)=>{

                let docid = req.body.doctorid;
                const q=`Select concat(fname, " ",lname) as "Prisoner Name", pid as "Prisoner id", recordid as "Record id",
                        updatedate as "Update date" from prisoner natural join
                            medical_record join doctor on doctor_id = doctorid where doctorid = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[docid],(error,data)=>{  // set the block id
                        if(error)
                            return res.json({error}); // error occured
                        else
                            return res.json(data); // return data if a ll good
                    }) 
                }
                catch(err) // catch block
                {
                    return res.json({err});
                }
            },
            getRecordtreatments : async(req,res)=>{
                let recordid = req.body.recordid;
                let pid = req.body.pid;
                const q=`Select t.drugname as "Drug Name", t.doses as "Drug Doses", r.doses as "Admission doses" from record_treatments as r natural join medical_record join treatments t on t.drugname = r.drugname WHERE  r.prisonerid = ? AND r.recordid = ?;`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[pid, recordid],(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getallstaff : async(req,res)=>{
                const q=`Select * from staff `; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getstaffbyid : async(req,res)=>{
                let staffid = req.body.staff_id;
                const q=`Select concat(fname," ", lname) as "Staff Name", 
                ssn, birthdate, hiredate,supervisor_id,salary,shift,status,staff_type as "Type" from staff where staff_id = ?`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,[staffid],(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            getallPrisonerCondition : async(req,res)=>{
                const q=`Select pid as "Prisoner id" , conditionname as "Condition Name", severity as "Severity" from prisoner_condition`; // formulate query
                try // try-catch for error handling
                {
                    db.query(q,(error,data)=>{ 
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            selectdoctors:async(req,res)=>{
                const q1=`select * from doctor,staff where staff_id=doctor_id`
                try{
                    db.query(q1,(error,data)=>{
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
        
            selectdoctorsbyid:async(req,res)=>{
                let id=req.body.id;
                const q1=`select * from doctor,staff where staff_id=doctor_id and doctor_id=${id}`;
                try{
                    db.query(q1,(error,data)=>{
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            selectprisonercond:async(req,res)=>{
                let id=req.body.id;
        
                const q1=`select * from prisoner_condition where pid=${id}`;
                try{
                    db.query(q1,(error,data)=>{
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
            prisoneroffenses:async(req,res)=>{
                let id=req.body.id;
                const q1=`select o.offenseid,prisonerid,convicteddate,served,description,offensename,jailtime,degree from convicted_of as c,offense as o where prisonerid=${id} and o.offenseid=c.offenseid `;
                try{
                    db.query(q1,(error,data)=>{
                        if(error)
                        {
                            return res.json({error});
                        }
                        else
                        {
                            return res.json(data);
                        }
                    })
                }
                catch(err)
                {
                    return res.json({err});
                }
            },
}

export default admincontroller