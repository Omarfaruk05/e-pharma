import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import { ENUM_ROLE } from "../../../enums/user";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.USER],
      default:ENUM_ROLE.USER,
    },
    photo: { type: String },
    isEmailVerified: { type: Boolean, default: false },
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
