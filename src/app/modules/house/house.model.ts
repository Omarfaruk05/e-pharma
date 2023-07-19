import { Schema, model } from "mongoose";
import { HouseModel, IHome } from "./house.interface";

const houseSchema = new Schema<IHome, HouseModel>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Booked"],
      default: "Available",
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    bathrooms: {
      type: String,
      required: true,
    },
    roomSize: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    availabilityDate: {
      type: Date,
      required: true,
    },
    rentPerMonth: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const House = model<IHome, HouseModel>("House", houseSchema);
