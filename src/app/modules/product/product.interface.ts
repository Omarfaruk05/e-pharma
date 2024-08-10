import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ICategory } from "../category/category.interface";
import { IVariant } from "../variant/variant.interface";

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
      primary: ICategory['_id'];
      secondary: ICategory['_id'];
      tertiary: ICategory['_id'];
  };
  variants: IVariant['_id'][];
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
