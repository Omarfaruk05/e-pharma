import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserOTPVerificationController } from "./userOTPVerification.controller";

const router = express.Router();

router.post("/verifyOTP", UserOTPVerificationController.verifyOTP);
router.post(
  "/resendOTPVerification",
  UserOTPVerificationController.recendOTPVerification
);

export const UserOTPVerificationRoute = router;
