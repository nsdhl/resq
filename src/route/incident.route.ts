import express from "express";
import { createNewIncident, getAllIncident } from "../controllers/incident.controller";

const router = express.Router();

router.post("/", createNewIncident)
router.get("/", getAllIncident)

export default router;