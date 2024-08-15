import express from "express";
import { UserOTPVerificationController } from "./userOTPVerification.controller";

const router = express.Router();

router.post("/verifyOTP", UserOTPVerificationController.verifyOTP);
router.post(
  "/resendOTPVerification",
  UserOTPVerificationController.recendOTPVerification
);

export const UserOTPVerificationRoute = router;
