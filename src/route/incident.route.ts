import express from "express";
import { createNewIncident, getByIncidentImage, getByIncidentName, getByLocation, getByUser } from "../controllers/incident.controller";

const router = express.Router();

router.post("/", createNewIncident)
router.get("/user", getByUser)
router.get("/location", getByLocation)
router.get("/incidentName", getByIncidentName)
router.get("/incidentImage", getByIncidentImage )
export default router;