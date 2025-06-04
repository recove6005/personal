import express from 'express';
import { jwtMiddleware } from '../controllers/middleware/jwt-middleware.js';
import { authCheck, gatePass } from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/pass', gatePass);
router.post('/check', jwtMiddleware, authCheck);

export default router;
