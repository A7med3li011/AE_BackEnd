import mongoose, { Schema } from "mongoose";

const orederSceham = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: Date,
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      amount: Number,
      size: String,
    },
  ],
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymnetMethod: { type: String, required: true, enum: ["card", "cash"] },
  status: {
    type: String,
    default: "placed",
    enum: [
      "placed",
      "waitpayment",
      "deliverd",
      "onway",
      "cancelled",
      "rejected",
    ],
  },
  totalPrice: Number,
  cancelBy: { type: mongoose.Types.ObjectId, ref: "User" },
  reasonCancellation: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },

  finalPrice: Number,
});

const orderModel = mongoose.model("Order", orederSceham);
export default orderModel;
