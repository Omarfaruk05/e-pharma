
import { Model } from "mongoose";
import { IUser } from "../user/user.interface";

export type IRefreshTokenResponse = {
  accessToken: string;
};


export interface IToken extends Document {
  user: IUser['_id'];
  token: string;
  expiryDate: Date;
}


export type TokenModel = Model<IToken, Record<string, unknown>>
