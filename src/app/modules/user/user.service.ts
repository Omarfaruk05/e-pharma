import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser, IUserResponse } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (userData: IUser): Promise<IUser> => {

  const isUserExist = await User.findOne({email: userData.email})

  if(isUserExist){
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already used!")
  }


  const result = await User.create(userData);

  return result;
};

const getAllUserService = async (): Promise<IUser[] | null> => {
  const result = await User.find({}, { password: 0 });

  return result;
};

const getSingleUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id, { password: 0 });

  return result;
};

const updateUserService = async (
  id: string,
  updatedData: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

export const UserService = {
  createUserService,
  getAllUserService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
};
