import express from "express";
import { createNewIncident, getByUser } from "../controllers/incident.controller";
import { isLogin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", isLogin, createNewIncident)
router.get("/user", isLogin, getByUser)

export default router;
