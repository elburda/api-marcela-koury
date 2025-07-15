
import Pedido from '../models/pedidosModels.js';

// Obtener pedidos del vendedor logueado
export const obtenerMisPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ vendedor: req.user.id })
      .populate('vendedor', 'nombre email')
      .populate('articulos.articulo');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: err.message });
  }
};

// Obtener pedidos agrupados por vendedor (admin)
export const obtenerPedidosPorVendedor = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('vendedor', 'nombre apellido email')
      .populate('articulos.articulo');

    const agrupados = pedidos.reduce((acc, pedido) => {
      // Ignorar pedidos sin vendedor válido
      if (!pedido.vendedor || !pedido.vendedor._id) return acc;

      const idVendedor = pedido.vendedor._id.toString();

      if (!acc[idVendedor]) {
        acc[idVendedor] = {
          vendedor: pedido.vendedor,
          pedidos: []
        };
      }

      acc[idVendedor].pedidos.push(pedido);
      return acc;
    }, {});

    res.json(Object.values(agrupados));
  } catch (err) {
    res.status(500).json({ message: 'Error al agrupar pedidos', error: err.message });
  }
};

// Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido({
      vendedor: req.user.id,
      articulos: req.body.articulos,
      estado: 'pendiente',
      fechaPedido: new Date()
    });
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pedido', error: err.message });
  }
};

// Eliminar pedido
export const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    // Solo el vendedor creador o un admin puede eliminar
    if (pedido.vendedor.toString() !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await pedido.deleteOne();
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar pedido', error: err.message });
  }
};

// Obtener pedido por ID (detalle)
export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('vendedor', 'nombre email')
      .populate('articulos.articulo');

    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pedido', error: err.message });
  }
};

// ACTUALIZAR pedido (solo estado)
export const actualizarPedido = async (req, res) => {
  try {
    console.log("🟡 Body recibido en actualizarPedido:", req.body);
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    if (req.body.estado) {
      pedido.estado = req.body.estado;
    }

    await pedido.save();
    res.json({ message: 'Pedido actualizado', pedido });
  } catch (err) {
    console.error("❌ Error en actualizarPedido:", err);
    res.status(500).json({ message: 'Error al actualizar pedido', error: err.message });
  }
};
// Actualizar solo el estado del pedido (PUT /pedidos/:id/estado)
export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ message: 'El campo "estado" es obligatorio' });
    }

    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    pedido.estado = estado;
    await pedido.save();

    res.json({ message: 'Estado actualizado correctamente', pedido });
  } catch (err) {
    console.error('❌ Error al actualizar estado del pedido:', err);
    res.status(500).json({ message: 'Error al actualizar estado del pedido', error: err.message });
  }
};



// Obtener pedido por ID (para otras vistas)
export const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id)
      .populate('vendedor', 'nombre apellido email')
      .populate('articulos.articulo');

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(pedido);
  } catch (error) {
    console.error("❌ Error al obtener pedido por ID:", error);
    res.status(500).json({ message: "Error al obtener el pedido" });
  }
};
