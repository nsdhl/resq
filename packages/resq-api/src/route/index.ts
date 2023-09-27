import express from "express";
import incidentRoutes from "./incident.route";
import userRoute from "./user.route";
import subscriptionRoute from "./subscription.route"
import sosRoute from "./sos.route"
const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user", userRoute)
router.use("/subscription", subscriptionRoute)
router.use("/sos", sosRoute)

export default router;
