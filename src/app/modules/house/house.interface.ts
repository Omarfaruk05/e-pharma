import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IHome = {
  owner: Types.ObjectId | IUser;
  name: string;
  address: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  roomSize: string;
  picture: string;
  status: "Available" | "Booked";
  bookedBy?: Types.ObjectId | IUser;
  availabilityDate: Date;
  rentPerMonth: string;
  phoneNumber: string;
  description: string;
};

export type HouseModel = Model<IHome, Record<string, unknown>>;

export type IHouseFilters = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  price?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
