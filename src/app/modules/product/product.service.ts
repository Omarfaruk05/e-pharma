import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IHome, IHouseFilters } from "./product.interface";
import { House } from "./product.model";
import { User } from "../user/user.model";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { productSearchableFields } from "./product.constant";

// creat house service
const createHouseService = async (
  user: any,
  homeData: IHome
): Promise<IHome> => {
  const { _id } = user;

  const isHouseOwner = await User.findById(_id);

  if (!isHouseOwner) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You are not an authorized Owner."
    );
  }
  homeData.owner = _id;
  homeData.availabilityDate = new Date(homeData.availabilityDate);
  const result = await House.create(homeData);

  return result;
};

// get all house service
const getAllHouseService = async (
  filters: IHouseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IHome[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

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
  if (minPrice && !maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: Number(minPrice) } }],
    });
  }
  if (!minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $lte: Number(maxPrice) } }],
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }],
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
  const result = await House.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await House.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// creat single House service
const getSingleHouseService = async (id: string): Promise<IHome | null> => {
  const result = await House.findById(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Sorry, There is no House with this id."
    );
  }

  return result;
};

// update House service
const updateHouseService = async (
  id: string,
  updatedData: Partial<IHome>,
  user: any
): Promise<IHome | null> => {
  const { _id } = user;
  const house = await House.findOne({ _id: id, owner: _id });

  if (!house) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Can't update the house because this is not your house."
    );
  }

  const result = await House.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

// delete house service
const deleteHouseService = async (
  id: string,
  user: any
): Promise<IHome | null> => {
  const { _id } = user;
  const house = await House.findOne({ _id: id, owner: _id });

  if (!house) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Can't delete the house because this is not your house."
    );
  }
  const result = await House.findByIdAndDelete(id);

  return result;
};

export const HouseService = {
  createHouseService,
  getAllHouseService,
  getSingleHouseService,
  updateHouseService,
  deleteHouseService,
};
