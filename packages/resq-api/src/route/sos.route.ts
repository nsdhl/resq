import express from "express";
import { isLogin } from "../middleware/auth.middleware";
import { createSoS } from "../controllers/sos.controller";

const router = express.Router();

router.post("/", isLogin, createSoS)

export default router;
