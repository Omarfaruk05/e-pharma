import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryService = async (
  categoryData: ICategory
): Promise<ICategory> => {
  const isCategoryExist = await Category.findOne({ slug: categoryData.slug });

  if (isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Slug is already used!");
  }

  const result = await Category.create(categoryData);
  return result;
};

const getAllCategoriesService = async (): Promise<ICategory[]> => {
  const result = await Category.find();
  return result;
};

const getSingleCategoryService = async (
  id: string
): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryService = async (
  id: string,
  updatedData: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await Category.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }

  return result;
};

const deleteCategoryService = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }

  return result;
};

export const CategoryService = {
  createCategoryService,
  getAllCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
