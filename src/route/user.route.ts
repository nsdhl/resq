import express from "express";

<<<<<<< HEAD
import createUser from "../controllers/createuser.controller";
=======
import { createUser, userLogin } from "../controllers/user.controller";
>>>>>>> dafe0b62fe7b8b4d2dd495ef2ac25ce1be982ce7

const router = express.Router();

router.post('/register', createUser);
<<<<<<< HEAD
=======
router.post('/login', userLogin);
>>>>>>> dafe0b62fe7b8b4d2dd495ef2ac25ce1be982ce7

export default router;