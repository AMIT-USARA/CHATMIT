import express from 'express'
import { Login, Logout, onBoard, Signup } from '../controllers/AuthC.js';
import { protectRoute } from '../middleware/protectRout.js';
const router = express.Router()

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/output",Logout);
router.post('/onboarding',protectRoute,onBoard);


export default router;