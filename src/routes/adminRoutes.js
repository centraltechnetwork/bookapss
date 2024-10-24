import { getUsers, getUser,getOneAdmin, deleteUser,updateAdmin, deleteAdmin, loginAdmin } from "../controller/adminController.js";
import{adminReg} from "../controller/adminController.js";
import { getAdmin } from "../controller/adminController.js";
import {authorizeUser  } from '../middleware/authorize.js';
import { checkRoles } from "../middleware/checkroles.js";

import express from "express";

const router = express.Router();

router.route('/register').post(adminReg);

router.route("/users").get(authorizeUser,checkRoles(['admin']),getUsers);

router.route("/list-user").get(authorizeUser, checkRoles(['admin']), getUser);

router.route("/list-admin").get(authorizeUser,checkRoles(['admin']), getAdmin);

router.route("/list-oneAdmin").get(authorizeUser,checkRoles(['admin']), getOneAdmin);

router.route("/delete-user/:id").delete(authorizeUser, checkRoles(['admin']),deleteUser);

router.route("/update-admin/:id").patch(authorizeUser,checkRoles(['admin']), updateAdmin);

router.route("/delete-admin/:id").delete(authorizeUser,checkRoles(['admin']), deleteAdmin);

router.route("/login").post(loginAdmin);

export default router;