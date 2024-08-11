import { Model, Types } from "mongoose";

export interface IShippingAddress extends Document {
  _id: Types.ObjectId;
  division: string;
  district: string;
  subDistrict: string;
  address: string;
  name: string;
  phone: string;
}

export type ShippingAddressModel = Model<
  IShippingAddress,
  Record<string, unknown>
>;

export type IShippingAddressFilter = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  price?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
