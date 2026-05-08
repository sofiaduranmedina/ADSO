import { Router } from "express";
import { usuario,crearUsuario,actualizarUsuario } from "../controllers/user.js";

const router = Router();
router.get('/traerDatos', usuario);
router.post('/crear', crearUsuario);
router.put("/actualizar/:id", actualizarUsuario);

export default router