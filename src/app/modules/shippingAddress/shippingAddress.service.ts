import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SortOrder, Types } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {
  IShippingAddress,
  IShippingAddressFilter,
} from "./shippingAddress.interface";
import { ShippingAddress } from "./shippingAddress.model";
import { shippingAddressSearchableFields } from "./shippingAddress.constant";

const createShippingAddressService = async (
  variantData: IShippingAddress
): Promise<IShippingAddress> => {
  const result = await ShippingAddress.create(variantData);
  return result;
};

const getAllShippingAddressesService = async (
  filters: IShippingAddressFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IShippingAddress[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: shippingAddressSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: `^${value}$`, $options: "i" },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await ShippingAddress.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ShippingAddress.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleShippingAddressService = async (
  id: string
): Promise<IShippingAddress | null> => {
  const result = await ShippingAddress.findById(id);

  return result;
};

const updateShippingAddressService = async (
  id: string,
  updatedData: Partial<IShippingAddress>
): Promise<IShippingAddress | null> => {
  const result = await ShippingAddress.findOneAndUpdate(
    { _id: id },
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "ShippingAddres not found!");
  }

  return result;
};

const deleteShippingAddressService = async (
  id: string
): Promise<IShippingAddress | null> => {
  const result = await ShippingAddress.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "ShippingAddres not found!");
  }

  return result;
};

export const ShippingAddressService = {
  createShippingAddressService,
  getAllShippingAddressesService,
  getSingleShippingAddressService,
  updateShippingAddressService,
  deleteShippingAddressService,
};
