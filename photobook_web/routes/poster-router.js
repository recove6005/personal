import express from "express";
import multer from "multer";
import { addPoster } from "../controllers/poster-controller.js";

const router = express.Router();

const upload = multer();
router.post('/poster/add-poster', upload.array('files'), addPoster);

export default router;