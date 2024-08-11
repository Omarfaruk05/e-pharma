import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { VariantService } from "./variant.service";
import pick from "../../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { variantFilterableFilds } from "./variant.constant";

const createVariant = catchAsync(async (req: Request, res: Response) => {
  const variantData = req.body;
  const result = await VariantService.createVariantService(variantData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Variant created successfully.",
    data: result,
  });
});

const getAllVariants = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, variantFilterableFilds);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await VariantService.getAllVariantsService(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All variants retrieved successfully.",
    data: result,
  });
});

const getSingleVariant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VariantService.getSingleVariantService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Variant retrieved successfully.",
    data: result,
  });
});

const updateVariant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await VariantService.updateVariantService(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Variant updated successfully.",
    data: result,
  });
});

const deleteVariant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VariantService.deleteVariantService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Variant deleted successfully.",
    data: result,
  });
});

export const VariantController = {
  createVariant,
  getAllVariants,
  getSingleVariant,
  updateVariant,
  deleteVariant,
};
