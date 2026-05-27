import express from 'express';
// importar el controlador de usuarios 

import { registrarUser } from '../controllers/user.js';

const router = express.Router();
// ruta para registrar 

router.post('/registrar', registrarUser);

export default router;