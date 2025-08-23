import express from 'express'
import { protectRoute } from '../middleware/protectRout.js';
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/UserC.js';
const router = express.Router()
router.get('/',protectRoute,getRecommendedUsers)
router.get("/friends",protectRoute,getMyFriends)
router.post("/friend-request/:id",protectRoute,sendFriendRequest)
export default router;