import mongoose, { Schema } from "mongoose";
import { CategoryModel, ICategory } from "./category.interface";

const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model<ICategory , CategoryModel>("Category", categorySchema);
