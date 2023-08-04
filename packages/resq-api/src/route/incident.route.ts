import express from "express";
import { createNewIncident, getAllIncident, getByUser } from "../controllers/incident.controller";
import { isLogin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", isLogin, createNewIncident)
router.get("/user", isLogin, getByUser)
router.get("/", getAllIncident)

export default router;
