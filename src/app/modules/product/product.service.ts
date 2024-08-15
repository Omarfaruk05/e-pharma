import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { productSearchableFields } from "../product/product.constant";
import { IProduct, IProductFilter } from "./product.interface";
import { Product } from "./product.model";

const createProductService = async (
  variantData: IProduct
): Promise<IProduct> => {
  const result = await Product.create(variantData);
  return result;
};

const getAllProductsService = async (
  filters: IProductFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, minPrice, maxPrice, primaryId, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search term filter
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Price filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    andConditions.push({
      price: {
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice }),
      },
    });
  }

  // Primary category filter
  if (primaryId) {
    andConditions.push({
      "categories.primary": primaryId,
    });
  }

  // Additional filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: `^${value}$`,
          $options: "i",
        },
      })),
    });
  }

  // Sorting conditions
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Applying conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // Fetching data
  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "categories.primary",
      select: "name slug",
    })
    .populate({
      path: "categories.secondary",
      select: "name slug",
    })
    .populate({
      path: "categories.tertiary",
      select: "name slug",
    })
    .populate({
      path: "variants",
    })
    .exec();

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProductService = async (
  id: string
): Promise<IProduct | null> => {
  const result = await Product.findById(id)
    .populate({
      path: "categories.primary",
      select: "name slug",
    })
    .populate({
      path: "categories.secondary",
      select: "name slug",
    })
    .populate({
      path: "categories.tertiary",
      select: "name slug",
    })
    .populate({
      path: "variants",
    })
    .exec();
  return result;
};

const updateProductService = async (
  id: string,
  updatedData: Partial<IProduct>
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found!");
  }

  return result;
};

const deleteProductService = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found!");
  }

  return result;
};

export const ProductService = {
  createProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};
