import express from "express";
import multer from "multer";
import { addPoster, getPoster } from "../controllers/poster-controller.js";

const router = express.Router();

const upload = multer();
router.post('/poster/add-poster', upload.array('files'), addPoster);
router.post('/poster/get-poster', getPoster);
export default router;