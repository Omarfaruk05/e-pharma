import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { HouseService } from "./house.service";
import { houseFilterableFields } from "./house.constant";
import { IHome } from "./house.interface";

// creat house controller
const createHouse = catchAsync(async (req: Request, res: Response) => {
  const { ...houseData } = req.body;

  const result = await HouseService.createHouseService(houseData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "House created successfully.",
    data: result,
  });
});

// get all house controller
const getAllHouse = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, houseFilterableFields);

  const result = await HouseService.getAllHouseService(filters);

  sendResponse<IHome[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Houeses received successfully.",

    data: result,
  });
});

// get single House controller
const getSingleHouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HouseService.getSingleHouseService(id);

  if (!result) {
    throw new ApiError(httpStatus.OK, "No House found with this id");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "House received successfully.",
    data: result,
  });
});

// update house controller
const updateHouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const user = req.user;
  const result = await HouseService.updateHouseService(id, updatedData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "House updated successfully.",
    data: result,
  });
});

// delete house controller
const deleteHouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await HouseService.deleteHouseService(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "House deleted successfully.",
    data: result,
  });
});

export const HouseController = {
  createHouse,
  getAllHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
};
