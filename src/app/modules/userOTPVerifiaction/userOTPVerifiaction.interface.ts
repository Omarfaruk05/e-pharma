import { Model } from "mongoose";

export interface IUserOTPVerification extends Document {
 userId: string;
 otp: string;
 createdAt: Date;
 expiresAt: Date;
  }


  export type UserOTPVerifiactionModel = Model<IUserOTPVerification, Record<string, unknown>>