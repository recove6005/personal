import express from 'express';
import { jwtMiddleware } from '../controllers/middleware/jwt-middleware.js';
import { load, loadJournal, save } from '../controllers/box-controller.js';

const router = express.Router();

router.post('/box/save', jwtMiddleware, save);
router.post('/box/load', jwtMiddleware, load);
router.post('/box/load-journal', jwtMiddleware, loadJournal);

export default router;
