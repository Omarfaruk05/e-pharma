import { Model, Types } from "mongoose";
import { ENUM_ROLE } from "../../../enums/user";

export type IUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: ENUM_ROLE.SUPER_ADMIN | ENUM_ROLE.ADMIN | ENUM_ROLE.USER;
  photo: string;
  isEmailVerified: boolean;
};

export type IUserResponse = {
  name: string;
  email: string;
  password?: string;
  role: ENUM_ROLE.SUPER_ADMIN | ENUM_ROLE.ADMIN | ENUM_ROLE.USER;
  photo: string;
  isEmailVerified: boolean;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IVerifiedUser = {
  _id: string;
  role: String;
  iat?: number;
  exp?: number;
};
