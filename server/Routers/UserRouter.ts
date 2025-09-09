import express from 'express';
const router = express.Router();
import NodeRouter from './NodeRouter';
import EdgeRouter from './EdgeRouter';
import {register, login, authenticateToken} from "../Controller/user.controller";

router.post("/authenticate", authenticateToken);
router.use("/register", register);
router.use("/login", login);
router.use("/nodes", NodeRouter);
router.use("/edges", EdgeRouter);

export default router