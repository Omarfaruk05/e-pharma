import { Model, Types } from "mongoose";
import { ICategory } from "../category/category.interface";

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
    primary: ICategory["_id"];
    secondary: ICategory["_id"];
    tertiary: ICategory["_id"];
  };
  variants: [string];
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilter = {
  searchTerm?: string;
  price?: number;
  sotckStatus?: boolean;
  status?: boolean;
  primaryId?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
