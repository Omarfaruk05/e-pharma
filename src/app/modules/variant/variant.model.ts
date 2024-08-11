import mongoose, { model, Schema } from "mongoose";
import { IVariant, VariantModel } from "./variant.interface";

const variantSchema: Schema<IVariant> = new mongoose.Schema(
  {
    productName: String,
    variant: String,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Variant = model<IVariant, VariantModel>("Variant", variantSchema);
