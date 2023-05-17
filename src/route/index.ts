import express from "express";
<<<<<<< HEAD
import incidentRoutes from "./incident.route";

const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user/regiser", )

=======

import incidentRoutes from "./incident.route"
import userRoutes from "./user.route";
const router = express.Router();

router.use("/incident", incidentRoutes)
router.use("/user", userRoutes);
>>>>>>> 2ef5485 (pushing staged files to user-auth)
export default router;