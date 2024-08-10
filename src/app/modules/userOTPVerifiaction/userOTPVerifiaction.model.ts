import mongoose, { Schema } from "mongoose";
import {
  IUserOTPVerification,
  UserOTPVerifiactionModel,
} from "./userOTPVerifiaction.interface";

;

const userOTPVerificationSchema = new Schema<
  IUserOTPVerification,
  UserOTPVerifiactionModel
>(
  {
    userId: { type: String, required: true },
    otp: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const UserOTPVerification = mongoose.model<
  IUserOTPVerification,
  UserOTPVerifiactionModel
>("UserOTPVerification", userOTPVerificationSchema);
