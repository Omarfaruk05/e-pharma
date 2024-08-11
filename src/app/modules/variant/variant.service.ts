import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IVariant, IVariantFilters } from "./variant.interface";
import { SortOrder, Types } from "mongoose";
import { Variant } from "./variant.model";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { productSearchableFields } from "../product/product.constant";
import { variantSearchableFields } from "./variant.constant";

const createVariantService = async (
  variantData: IVariant
): Promise<IVariant> => {
  const result = await Variant.create(variantData);
  return result;
};

const getAllVariantsService = async (
  filters: IVariantFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IVariant[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: variantSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    andConditions.push({
      price: {
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice }),
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Variant.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Variant.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleVariantService = async (
  id: string
): Promise<IVariant | null> => {
  const result = await Variant.findById(id);
  return result;
};

const updateVariantService = async (
  id: string,
  updatedData: Partial<IVariant>
): Promise<IVariant | null> => {
  const result = await Variant.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Variant not found!");
  }

  return result;
};

const deleteVariantService = async (id: string): Promise<IVariant | null> => {
  const result = await Variant.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Variant not found!");
  }

  return result;
};

export const VariantService = {
  createVariantService,
  getAllVariantsService,
  getSingleVariantService,
  updateVariantService,
  deleteVariantService,
};
