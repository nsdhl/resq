import express from "express";

import createUser from "../controllers/createuser.controller";

const router = express.Router();

router.post('/register', createUser);

export default router;