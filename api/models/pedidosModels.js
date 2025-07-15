import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  articulos: [
    {
      articulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulo",
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ],
  estado: {
    type: String,
    enum: ["pendiente", "asignado", "en_proceso", "entregado", "completado"],
    default: "pendiente"
  },
  fechaPedido: {
    type: Date,
    default: Date.now
  }
});

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;

