import express from "express"
import dotenv from "dotenv";
import AuthRoutes from './Routes/AuthRoutes.js'
import UserRoutes from './Routes/UserRoutes.js'
import {connectDB} from './config/dataBase.js'
import cookieParser from "cookie-parser";
      

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5001;


app.use(express.json())
app.use(cookieParser()); 
app.use("/api/auth",AuthRoutes);
app.use("/api/users",UserRoutes);

// do not write full code here because it's redues readability of code or it's not a good prectice for any devloper
// app.get("/api/auth/signup",(req,res)=>{
//     res.send("Sign up Ruote");
// });
// app.get("/api/auth/login",(req,res)=>{
//     res.send("Login Route");
// });

// app.get("/api/auth/logout",(req,res)=>{
//     res.send("logout Route");
// });



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});