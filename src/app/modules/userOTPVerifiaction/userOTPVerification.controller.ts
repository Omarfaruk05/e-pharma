import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserOTPVerificationService } from "./userOTPVerification.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const { userId, otp } = req.body;
  const result = await UserOTPVerificationService.verifyOTP({ userId, otp });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User email verified successfully.",
    data: result,
  });
});
const recendOTPVerification = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, email } = req.body;
    const result = await UserOTPVerificationService.recendOTPVerification({
      userId,
      email,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP resended successfully.",
      data: result,
    });
  }
);

export const UserOTPVerificationController = {
  verifyOTP,
  recendOTPVerification,
};
