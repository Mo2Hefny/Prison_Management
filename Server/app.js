import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import adminrouter from "./routers/adminroute.js";
import doctorrouter from "./routers/doctorroute.js";
import managerrouter from "./routers/managersroute.js";
import visitorrouter from "./routers/visitorroute.js";
const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.json({
        status:"sucess"
    });
});


app.use('/admin',adminrouter);
app.listen(3000);