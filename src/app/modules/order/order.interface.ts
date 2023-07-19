import { Model, Types } from "mongoose";
import { IHome } from "../house/house.interface";
import { IUser, IUserResponse } from "../user/user.interface";

export type IOrder = {
  cow: Types.ObjectId | IHome;
  buyer: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
