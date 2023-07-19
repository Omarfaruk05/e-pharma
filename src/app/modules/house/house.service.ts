import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IHome, IHouseFilters } from "./house.interface";
import { House } from "./house.model";
import { houseSearchableFields } from "./house.constant";

// creat house service
const createHouseService = async (homeData: IHome): Promise<IHome> => {
  const result = await House.create(homeData);

  return result;
};

// get all house service
const getAllHouseService = async (filters: IHouseFilters): Promise<IHome[]> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: houseSearchableFields.map((field) => ({
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

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await House.find(whereConditions);

  return result;
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
