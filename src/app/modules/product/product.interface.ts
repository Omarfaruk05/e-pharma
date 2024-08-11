import { Model, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  categories: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  variants: [string];
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilter = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  price?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
