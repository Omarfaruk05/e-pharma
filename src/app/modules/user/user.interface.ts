import { Model, StringSchemaDefinition, Types } from "mongoose";
import { IHome } from "../house/house.interface";

export type IUser = {
  fullName: string;
  role?: "House Owner" | "House Renter";
  phoneNumber: string;
  email: string;
  house: Types.ObjectId | IHome;
  password: string;
};

export type IUserResponse = {
  fullName: string;
  role: "House Owner" | "House Renter";
  phoneNumber: string;
  email: string;
  house: Types.ObjectId | IHome;
  password?: string;
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
