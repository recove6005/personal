import express from 'express';
import { jwtMiddleware } from '../controllers/middleware/jwt-middleware.js';
import { load, save } from '../controllers/board-controller.js';

const router = express.Router();

router.get('/board/load', jwtMiddleware, load);
router.post('/board/save', jwtMiddleware, save);

export default router;