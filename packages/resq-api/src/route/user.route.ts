import express from "express";

import { adminRegister, createUser, userLogin } from "../controllers/user.controller";

const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);
router.post("/admin/register", adminRegister)

export default router;
