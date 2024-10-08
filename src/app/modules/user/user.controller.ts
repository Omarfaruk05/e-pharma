import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { UserOTPVerificationService } from "../userOTPVerifiaction/userOTPVerification.service";
import { Types } from "mongoose";
import pick from "../../../shared/pick";
import { userFilterableFilds } from "./user.constant";
import { paginationFields } from "../../constants/pagination";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserService.createUserService(userData);

  result.password = "";

  if (result._id) {
    const data: {
      _id: Types.ObjectId;
      email: string;
    } = { _id: result._id, email: result.email };
    const newResult = await UserOTPVerificationService.sendOTPVerificationEmail(
      data
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created successfully.",
      data: newResult,
    });
  }
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFilds);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsersService(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users received successfully.",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUserService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User received successfully.",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await UserService.updateUserService(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully.",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUserService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully.",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
