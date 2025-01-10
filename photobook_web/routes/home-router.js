import express from "express";
import { goHomePage } from "../controllers/home-controller.js";

const router = express.Router();

router.get('/', goHomePage);

export default router;