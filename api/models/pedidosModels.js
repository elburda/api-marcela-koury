
import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  articulos: [{
    articulo: { type: mongoose.Schema.Types.ObjectId, ref: "Articulo", required: true },
    cantidad: { type: Number, required: true }
  }],
  estado: {
    type: String,
    enum: ["pendiente", "asignado", "en_proceso", "entregado"],
    default: "pendiente"
  },
  localAsignado: { type: mongoose.Schema.Types.ObjectId, ref: "Local" },
  fechaPedido: { type: Date, default: Date.now }
});

export const Pedido = mongoose.model("Pedido", pedidoSchema);
