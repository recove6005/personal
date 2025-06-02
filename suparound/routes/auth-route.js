import express from 'express';
import { jwtMiddleware } from '../controllers/config/jwt-config.js';

const router = express.Router();

router.get('/gate', jwtMiddleware, login);

export default router;