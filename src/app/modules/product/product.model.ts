import mongoose, { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photos: { type: [String], required: true },
    description: { type: String, required: true },
    metaKey: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stockStatus: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
    categories: {
      primary: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      secondary: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      tertiary: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct, ProductModel>("Product", productSchema);
