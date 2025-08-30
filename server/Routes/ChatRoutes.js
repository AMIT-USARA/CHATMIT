import express from "express";
import { protectRoute } from "../middleware/protectRout.js";
import { getStreamToken } from "../controllers/ChatC.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;