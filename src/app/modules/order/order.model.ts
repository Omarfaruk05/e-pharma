import mongoose, { Schema } from "mongoose";
import { IOrder, OrderModel } from "./order.interface";

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    orderDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model<IOrder, OrderModel>("Order", orderSchema);
