import express from 'express';
import { loginRoutes } from '../controllers/login.js';

const router = express.Router();

// ruta para el login
router.post('/login', loginRoutes);
export default router;
