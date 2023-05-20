import express from "express";
import { createNewIncident, getByLocation, getByUser } from "../controllers/incident.controller";
import { isLogin } from "../middleware/auth.middleware";

const router = express.Router();

//@ts-ignore
router.post("/", isLogin, createNewIncident)
//@ts-ignore
router.get("/user", isLogin, getByUser)
router.get("/location", getByLocation)

export default router;
