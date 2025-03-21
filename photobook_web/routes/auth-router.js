import express from "express";
import { validateSecretEntry, validateSecretMain } from "../controllers/auth-controller.js";

const router = express.Router();

router.post('/auth/validate-secret-entry', validateSecretEntry);
router.post('/auth/validate-secret-main', validateSecretMain);

export default router;