import express from "express";
import { createNewIncident, getByLocation, getByUser } from "../controllers/incident.controller";

const router = express.Router();

router.post("/", createNewIncident)
router.get("/user", getByUser)
router.get("/location", getByLocation)

export default router;