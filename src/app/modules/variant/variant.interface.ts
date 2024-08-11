import { Model, Types } from "mongoose";

export interface IVariant extends Document {
  _id: Types.ObjectId;
  productName: string;
  variant: string;
  price: number;
  quantity: number;
}

export type VariantModel = Model<IVariant, Record<string, unknown>>;

export type IVariantFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  productName?: string;
  varient?: number;
};
