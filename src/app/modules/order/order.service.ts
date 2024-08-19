import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { Order } from "./order.model";
import { IOrder, IOrderFilter } from "./order.interface";
import { orderSearchableFields } from "./order.constant";
import { Variant } from "../variant/variant.model";

const createOrderService = async (orderData: IOrder): Promise<IOrder> => {
  const products = orderData?.products;

  for (const product of products) {
    await Variant.findByIdAndUpdate(
      { _id: product?.variant },
      { $inc: { quantity: -product?.quantity } }
    );
  }

  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersService = async (
  filters: IOrderFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { searchTerm, userId, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (userId) {
    andConditions.push({ userId: new mongoose.Types.ObjectId(userId) });
  }
  if (searchTerm) {
    andConditions.push({
      $or: orderSearchableFields.map((field) => ({
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
        [field]: {
          $regex: `^${value}$`,
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
  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("products.product")
    .populate("shippingAddress");

  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleOrderService = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id)
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "shippingAddress",
    });

  return result;
};

const updateOrderService = async (
  id: string,
  updatedData: Partial<IOrder>
): Promise<IOrder | null> => {
  const result = await Order.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found!");
  }

  return result;
};

const deleteOrderService = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found!");
  }

  return result;
};

export const OrderService = {
  createOrderService,
  getAllOrdersService,
  getSingleOrderService,
  updateOrderService,
  deleteOrderService,
};
