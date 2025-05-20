import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/pedidosControllers.js';

const router = express.Router();

router.get('/:id', getOrderById);
router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;