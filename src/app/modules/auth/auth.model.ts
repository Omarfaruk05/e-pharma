import mongoose, { Schema } from "mongoose";
import { IToken, TokenModel } from "./auth.interface";

const tokenSchema: Schema<IToken> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model<IToken, TokenModel>("Token", tokenSchema);
