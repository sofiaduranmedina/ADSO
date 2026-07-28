import { Router } from "express";
import { soloAdmin, VerificarToken} from "../middlewares/auth.middleware.js";

import {
  getProductos,
  getProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productcontroller.js";

const router = Router();

// Rutas públicas: cualquiera puede ver el menú, inclusi sin iniciar sesión

router.get("/productos", getProductos);
router.get("/productos/:id", getProductoPorId);

//Rutas protegidas: hay que estar loqueado y tener rol admin
router.post("/productos",VerificarToken,soloAdmin, crearProducto);
router.put("/productos/:id",VerificarToken,soloAdmin, actualizarProducto);
router.delete("/productos/:id",VerificarToken,soloAdmin, eliminarProducto);

export default router;