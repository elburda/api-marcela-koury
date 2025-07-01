import { Pedido } from "../models/pedidosModels.js";
import { User } from "../models/userModels.js";

// ✅ Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const { articulos } = req.body;
    const vendedorId = req.user.id;

    const nuevo = new Pedido({ vendedor: vendedorId, articulos });
    await nuevo.save();

    res.status(201).json(nuevo);
  } catch (err) {
    console.error("❌ Error al crear el pedido:", err);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

// ✅ Obtener pedidos del vendedor
export const getPedidosVendedor = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ vendedor: req.user.id })
      .populate("articulos.articulo")
      .populate("vendedor", "nombre apellido username email");
    res.json(pedidos);
  } catch (err) {
    console.error("❌ Error al obtener pedidos:", err.message);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

// ✅ Actualizar estado
export const actualizarEstado = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

// ✅ Eliminar pedido
export const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Pedido eliminado", pedido });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar pedido" });
  }
};

// ✅ Obtener todos los pedidos agrupados por vendedor (admin)
export const getPedidosPorVendedor = async (req, res) => {
  try {
    const vendedores = await User.find({ rol: "vendedor" });

    const resultado = await Promise.all(
      vendedores.map(async (vendedor) => {
        const pedidos = await Pedido.find({ vendedor: vendedor._id })
          .populate("articulos.articulo")
          .populate("vendedor", "nombre apellido email");
        return {
          vendedor: {
            _id: vendedor._id,
            nombre: vendedor.nombre,
            apellido: vendedor.apellido
          },
          pedidos
        };
      })
    );

    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error al obtener pedidos por vendedor:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ✅ Obtener pedido por ID con artículos y precios
export const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findById(id)
      .populate("articulos.articulo")
      .populate("vendedor", "nombre apellido email");

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const articulosFormateados = pedido.articulos.map(item => {
      const articulo = item.articulo;
      const cantidad = item.cantidad;
      const precio = articulo?.price || 0;

      return {
        titulo: articulo?.title || '',
        descripcion: articulo?.description || '',
        precio,
        cantidad,
        subtotal: cantidad * precio
      };
    });

    const total = articulosFormateados.reduce((acc, item) => acc + item.subtotal, 0);

    const resultado = {
      _id: pedido._id,
      estado: pedido.estado,
      fecha: pedido.fechaPedido || pedido.createdAt,
      vendedor: {
        nombre: pedido.vendedor?.nombre || '',
        email: pedido.vendedor?.email || ''
      },
      articulos: articulosFormateados,
      total
    };

    res.json(resultado);
  } catch (err) {
    console.error("❌ Error al obtener pedido por ID:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
