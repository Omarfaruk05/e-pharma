import bcrypt from "bcrypt";
import config from "../../../config";
import { UserOTPVerification } from "./userOTPVerifiaction.model";
import { transporter } from "./userOTPVerification.utils";
import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const sendOTPVerificationEmail = async ({
  _id,
  email,
}: {
  _id: Types.ObjectId;
  email: string;
}) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: "",
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b> ${otp} </b> in the app to verify your email address and complete the registration.<p>
            <p> This code <b> expires in 1 hour</b>. </p>`,
    };
    const hashedOTP = await bcrypt.hash(otp, Number(config.bcrypt_sald_round));
    console.log(hashedOTP);

    await User.findByIdAndUpdate({ _id }, { isEmailVerified: false });

    const newOTPVerification = await UserOTPVerification.create({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3500000,
    });

    await transporter.sendMail(mailOptions);

    return newOTPVerification;
  } catch (error: any) {
    return error.message;
  }
};

const verifyOTP = async ({ userId, otp }: any) => {
  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Empty otp details are not allowed."
    );
  }
  const UserOTPVerificationRecords = await UserOTPVerification.find({ userId });

  if (UserOTPVerificationRecords.length <= 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Account record doesn't exist or has been verified already. Please sign up or login."
    );
  }

  const { expiresAt, otp: hashedOTP } = UserOTPVerificationRecords[0];

  if (expiresAt.getTime() < Date.now()) {
    UserOTPVerification.deleteMany({ userId });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Code has expired. Please request again."
    );
  }
  const validOTP = await bcrypt.compare(otp, hashedOTP);
  if (!validOTP) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid code passed. Check your inbox."
    );
  }
  await User.updateOne({ _id: userId }, { isEmailVerified: true });
  await UserOTPVerification.deleteMany({ userId });

  const user = await User.findById({ _id: userId });
  return user;
};

const recendOTPVerification = async ({ userId, email }: any) => {
  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Empty otp details are not allowed."
    );
  }
  await UserOTPVerification.deleteMany({ userId });
  const result = await sendOTPVerificationEmail({ _id: userId, email });

  return result;
};
export const UserOTPVerificationService = {
  sendOTPVerificationEmail,
  verifyOTP,
  recendOTPVerification,
};
