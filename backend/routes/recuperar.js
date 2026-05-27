import express from 'express';
import {solicitarCodigo} from '../controllers/recuperar.js';

const router = express.Router();

// creamos la ruta

router.post('/solicitar-codigo', solicitarCodigo);

export default router;

