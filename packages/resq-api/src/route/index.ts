import express from "express";
import incidentRoutes from "./incident.route";
import userRoute from "./user.route";
import subscriptionRoute from "./subscription.route"
const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user", userRoute)
router.use("/subscription", subscriptionRoute)

export default router;
