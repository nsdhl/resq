import express from "express";
import { createSubscription } from "../controllers/subscription.controller";
import { isLogin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", isLogin, createSubscription)

export default router; 
