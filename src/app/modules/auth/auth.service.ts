import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  ILoginUser,
  ILoginUserResponse,
  IUser,
  IUserResponse,
} from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHalpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IRefreshTokenResponse } from "./auth.interface";
import { ENUM_ROLE } from "../../../enums/user";

const loginUserService = async (
  loginData: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await User.findOne(
    { email },
    { _id: 1, email: 1, password: 1, role: 1 }
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  // generating access token
  const accessToken = jwtHelpers.createToken(
    { _id: isUserExist?._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // generating refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id: isUserExist?._id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalide Refresh Token");
  }
  //checking deleted user's refresh token
  const { _id, role } = verifiedToken;

  let newAccessToken = "";

  if (
    role === ENUM_ROLE.SUPER_ADMIN ||
    role === ENUM_ROLE.SUPER_ADMIN ||
    role === ENUM_ROLE.USER
  ) {
    const isUserExist = await User.findOne(
      { _id },
      { _id: 1, password: 1, role: 1 }
    ).lean();

    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
    }

    //generate new access token
    newAccessToken = jwtHelpers.createToken(
      { _id: isUserExist._id, role: isUserExist.role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  }

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUserService,
  refreshTokenService,
};
