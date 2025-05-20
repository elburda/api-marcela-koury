import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
  items: [
    {
      articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articles',
        required: false
      },
        title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  priceTotal: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  branchOrder: {
    type: String,
    trim: true
  }
});

export default mongoose.model('pedidos', ordersSchema);
