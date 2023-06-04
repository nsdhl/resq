import express from "express";
import { createNewIncident, getByUser } from "../controllers/incident.controller";
import { isLogin } from "../middleware/auth.middleware";

const router = express.Router();

//@ts-ignore
router.post("/", isLogin, createNewIncident)
//@ts-ignore
router.get("/user", isLogin, getByUser)

export default router;
