import mongoose, { model, Schema } from "mongoose";
import {
  IShippingAddress,
  ShippingAddressModel,
} from "./shippingAddress.interface";

const shippingAddressSchema: Schema<IShippingAddress> = new mongoose.Schema(
  {
    division: { type: String, required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ShippingAddress = model<IShippingAddress, ShippingAddressModel>(
  "ShippingAddress",
  shippingAddressSchema
);
