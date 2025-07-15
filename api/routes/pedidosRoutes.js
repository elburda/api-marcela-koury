
import express from "express";
import {
  crearPedido,
  obtenerMisPedidos,
  eliminarPedido,
  obtenerPedidosPorVendedor,
  obtenerPedidoPorId,
  actualizarPedido,
  actualizarEstadoPedido
} from "../controllers/pedidosControllers.js";

import { authenticateJWT } from "../middleware/authenticateJWt.js";
import { verificarRol } from "../middleware/verificarRol.js";

const router = express.Router();

// Rutas específicas primero
router.post("/", authenticateJWT, verificarRol(["vendedor"]), crearPedido);
router.get("/admin", authenticateJWT, verificarRol(["admin"]), obtenerPedidosPorVendedor);

// Rutas que usan :id deben ir después de las rutas fijas como /admin
router.get("/", authenticateJWT, verificarRol(["vendedor"]), obtenerMisPedidos);
router.put("/:id/estado", authenticateJWT, verificarRol(["vendedor", "admin"]), actualizarEstadoPedido);
router.put("/:id", authenticateJWT, verificarRol(["vendedor", "admin"]), actualizarPedido);
router.delete("/:id", authenticateJWT, verificarRol(["admin", "vendedor"]), eliminarPedido);
router.get("/:id", authenticateJWT, verificarRol(["admin", "vendedor"]), obtenerPedidoPorId);

export default router;

