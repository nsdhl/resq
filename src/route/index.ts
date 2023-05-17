import express from "express";
import incidentRoutes from "./incident.route";
import userRoute from "./user.route";
const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user", userRoute)

export default router;