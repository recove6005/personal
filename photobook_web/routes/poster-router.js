import express from "express";
import multer from "multer";
<<<<<<< HEAD
import { addPoster, getPoster } from "../controllers/poster-controller.js";
=======
import { addPoster } from "../controllers/poster-controller.js";
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b

const router = express.Router();

const upload = multer();
router.post('/poster/add-poster', upload.array('files'), addPoster);
<<<<<<< HEAD
router.post('/poster/get-poster', getPoster);
=======

>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
export default router;