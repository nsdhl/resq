import express from "express";
import { createNewIncident, getAllIncident, getByUser , getIncidents, getSOS, deleteIncident, updateIncident} from "../controllers/incident.controller";
import { isLogin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", isLogin, createNewIncident)
router.get("/user", isLogin, getByUser)
router.get("/", getAllIncident)
router.get("/incidents", getIncidents)
router.get("/sos", getSOS)
router.put("/:id", isLogin, updateIncident)
router.delete("/:id", deleteIncident)

export default router;
