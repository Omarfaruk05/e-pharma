import { Model, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  thumbnail: string;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>;

export type ICategoryFilters = {
  searchTerm?: string;
};
