import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICategory, ICategoryFilters } from "./category.interface";
import { Category } from "./category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

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

const getAllCategoriesService = async (
  filters: ICategoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICategory[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { slug: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Category.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
