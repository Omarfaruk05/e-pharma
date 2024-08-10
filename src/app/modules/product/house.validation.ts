import { z } from "zod";

const createHouseZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "You have to provide a house name." }),
    address: z.string({
      required_error: "You have to provide a house address.",
    }),
    city: z.string({ required_error: "You have to provide a house city." }),
    bedrooms: z.string({
      required_error: "You have to provide a house bedrooms.",
    }),
    bathrooms: z.string({
      required_error: "You have to provide a house bathrooms.",
    }),
    roomSize: z.string({
      required_error: "You have to provide a house room size.",
    }),
    picture: z.string({
      required_error: "You have to provide a house picture.",
    }),
    status: z.enum(["Available", "Booked"]).optional(),
    bookedBy: z
      .union([
        z.string().uuid(),
        z.object({ _id: z.string().uuid() }).nullable(),
      ])
      .optional(),
    availabilityDate: z.string({
      required_error: "You have to provide a availability date.",
    }),
    rentPerMonth: z.string({
      required_error: "You have to provide a house rent perMonth.",
    }),
    phoneNumber: z.string({
      required_error: "You have to provide your phone number..",
    }),
    description: z.string({
      required_error: "You have to provide a house description.",
    }),
  }),
});

const updateHouseZodSchema = z.object({
  body: z.object({
    owner: z.union([
      z.string({ required_error: "You have to provide a owner id." }).uuid(),
      z.object({ _id: z.string().uuid() }).nullable(),
    ]),
    name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    bedrooms: z.string().optional(),
    bathrooms: z.string().optional(),
    roomSize: z.string().optional(),
    picture: z.string().optional(),
    status: z.enum(["Available", "Booked"]).optional(),
    bookedBy: z
      .union([
        z.string().uuid(),
        z.object({ _id: z.string().uuid() }).nullable(),
      ])
      .optional(),
    availabilityDate: z.date().optional(),
    rentPerMonth: z.string().optional(),
    phoneNumber: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const HouseValidation = {
  createHouseZodSchema,
  updateHouseZodSchema,
};
