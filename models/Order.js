const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemsSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    ref: 'Food',
    required: [true, 'Please provide Food Item id'],
  },
  name: {
    type: String,
    required: [true, 'Please provide Food Item name'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide Food Item quantity'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide Food Item price'],
  },
});

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide the total price'],
    },
    isPrepared: {
      type: Boolean,
      default: false,
    },
    orderItems: [CartItemsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
