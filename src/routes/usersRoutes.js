import { registerUser, updateUser,loginUser} from "../controller/userController.js";
import {authorizeUser  } from '../middleware/authorize.js';
import { checkRoles } from "../middleware/checkroles.js";
import express from "express";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/update-user/:id").patch(authorizeUser,checkRoles(['admin','user']), updateUser);
router.route("/login").post(loginUser);  


export default router;
