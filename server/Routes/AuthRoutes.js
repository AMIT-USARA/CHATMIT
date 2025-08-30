import express from 'express'
import { Login, Logout, onBoard, Signup } from '../controllers/AuthC.js';
import { protectRoute } from '../middleware/protectRout.js';
const router = express.Router()

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.post('/onboarding',protectRoute,onBoard);

router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user});
})

export default router;