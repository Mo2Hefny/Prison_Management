import jwt from "jsonwebtoken"
import db from "../db.js"
const authMiddleware = async (req, res, next) => {
        // Get the token from the authorization header
        const authHeader = req.headers.authorization;
        // Check if the token exists
        if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
        }
        // Check if the authorization header is in the correct format. "Bearer <token>"
        if (!authHeader.startsWith("Bearer") || authHeader.split(" ").length !== 2) {
        return res.status(401).json({ error: "Invalid token" });
        }
        // Get the token from the authorization header
        const token = authHeader.split(" ")[1];
        try {
            
        // Verify the token and get the user's id from it
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        // Get the user from the database
        let q=`SELECT * FROM doctor where doctor_id=${id}`
        db.query(q, (err, data) => {
            if (err) return res.json(err);
            else {      
       if (data==[]) {
            return res.status(404).json({ error:` User not found with that id${data}` });
        }
        else{
        // Attach the user to the request object
        req.doctor = data[0];
        //res.json(req.user);
        next();
    }
    }});
}
        catch (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Your token has expired. Pleaselog in again." });
            }
        res.status(401).json({ error: "Invalid token" });
        }
};
export default authMiddleware;