import express from "express";
import incidentRoutes from "./incident.route";

const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user/regiser", )

export default router;