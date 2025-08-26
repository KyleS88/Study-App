import express from 'express';
const router = express.Router();
import NodeRouter from './NodeRouter';
import EdgeRouter from './EdgeRouter';
import {register, login} from "../Controller/user.controller";
import {pool} from '../pool'
import { Request, Response } from 'express'
router.use("/register", register);
router.use("/login", login);
router.use("/nodes", NodeRouter);
router.use("/edges", EdgeRouter);

export default router