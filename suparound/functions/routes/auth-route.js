import express from 'express';
import { jwtMiddleware } from '../controllers/middleware/jwt-middleware.js';
import { authCheck, gatePass, getBcryptHash, load } from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/auth/pass', gatePass);
router.post('/auth/check', jwtMiddleware, authCheck);
router.post('/auth/hash', jwtMiddleware, getBcryptHash);
router.post('/auth/load', load);

export default router;
