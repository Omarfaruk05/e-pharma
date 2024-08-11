import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { ShippingAddressService } from "./shippingAddress.service";
import { shippingAddressFilterableFilds } from "./shippingAddress.constant";

const createShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const ShippingAddressData = req.body;
    const result = await ShippingAddressService.createShippingAddressService(
      ShippingAddressData
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "ShippingAddress created successfully.",
      data: result,
    });
  }
);

const getAllShippingAddresses = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, shippingAddressFilterableFilds);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ShippingAddressService.getAllShippingAddressesService(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All ShippingAddresss retrieved successfully.",
      data: result,
    });
  }
);

const getSingleShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ShippingAddressService.getSingleShippingAddressService(
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "ShippingAddress retrieved successfully.",
      data: result,
    });
  }
);

const updateShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ShippingAddressService.updateShippingAddressService(
      id,
      updatedData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "ShippingAddress updated successfully.",
      data: result,
    });
  }
);

const deleteShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ShippingAddressService.deleteShippingAddressService(
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "ShippingAddress deleted successfully.",
      data: result,
    });
  }
);

export const ShippingAddressController = {
  createShippingAddress,
  getAllShippingAddresses,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
