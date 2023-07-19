import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import { role } from "./user.constant";

const userSchema = new Schema<IUser, UserModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: role,
      default: "House Renter",
    },
    house: [
      {
        type: Schema.Types.ObjectId,
        ref: "House",
        default: [],
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sald_round)
  );

  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
