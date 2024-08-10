import mongoose, { Schema } from "mongoose";
import { IVariant, VariantModel } from "./variant.interface";

const variantSchema: Schema<IVariant> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model<IVariant ,VariantModel>("Variant", variantSchema);
