import pedidosModels from '../models/pedidosModels.js';

export const createOrder = async (req, res) => {
  try {
        const order = new pedidosModels({ ...req.body });
        const newOrder = await order.save();
        res.json(newOrder);
  } catch (err) {
        res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
        
        const orders = await pedidosModels.find();
        res.json(orders);
  } catch (err) {
        res.status(400).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await pedidosModels.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrder = await pedidosModels.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await pedidosModels.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
