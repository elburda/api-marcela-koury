import express from "express";
import {
  crearPedido,
  getPedidosVendedor,
  actualizarEstado,
  eliminarPedido,
  getPedidosPorVendedor,
  getPedidoById
} from "../controllers/pedidosControllers.js";
import { authenticateJWT } from "../middleware/authenticateJWt.js";
import { verificarRol } from "../middleware/verificarRol.js";





const router = express.Router();

router.post("/", authenticateJWT, verificarRol(["vendedor"]), crearPedido);
router.get("/", authenticateJWT, verificarRol(["vendedor"]), getPedidosVendedor);
router.put("/:id", authenticateJWT, verificarRol(["vendedor"]), actualizarEstado);
router.delete("/:id", authenticateJWT, verificarRol(["vendedor"]), eliminarPedido);
router.get("/admin", authenticateJWT, verificarRol(["admin"]), getPedidosPorVendedor);
router.get("/:id", authenticateJWT, verificarRol(["admin", "vendedor"]), getPedidoById);

export default router;
