import express from "express";
import incidentRoutes from "./incident.route"
import userRoutes from "./user.route";
const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user", userRoutes);
router.use("/subscribe", (req, res) => {
    const subscription = req.body;
});
export default router;