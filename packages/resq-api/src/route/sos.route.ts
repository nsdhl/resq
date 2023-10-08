import express from "express";
import { isLogin } from "../middleware/auth.middleware";
import { createSoS, getAllSOS } from "../controllers/sos.controller";
import { get } from "http";

const router = express.Router();

router.post("/", isLogin, createSoS)
router.get("/get", getAllSOS)

export default router;
