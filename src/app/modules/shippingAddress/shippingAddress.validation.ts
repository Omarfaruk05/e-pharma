import { z } from "zod";

const createShippingAddressZodSchema = z.object({
  body: z.object({
    division: z.string({
      required_error: "Divition is required.",
    }),
    district: z.string({
      required_error: "District is required.",
    }),

    subDistrict: z.string({
      required_error: "Sub-District is required.",
    }),
    address: z.string({
      required_error: "Address is required.",
    }),
    name: z.string({
      required_error: "Name is required.",
    }),
    phone: z.string({
      required_error: "Phone number is required.",
    }),
  }),
});
const updateShippingAddressZodSchema = z.object({
  body: z.object({
    division: z.string().optional(),
    district: z.string().optional(),

    subDistrict: z.string().optional(),
    address: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const ShippingAddressValidation = {
  createShippingAddressZodSchema,
  updateShippingAddressZodSchema,
};
