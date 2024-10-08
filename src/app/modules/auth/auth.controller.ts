import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IUserResponse } from "../user/user.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import config from "../../../config";
import { IRefreshTokenResponse } from "./auth.interface";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUserService(loginData);

  const { refreshToken, ...others } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully.",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  const result = await AuthService.refreshTokenService(refreshToken);

  // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === "production",
  //   httpOnly: true,
  // };

  // res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
