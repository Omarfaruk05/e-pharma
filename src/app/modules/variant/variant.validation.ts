import { z } from "zod";

export const createVariantZodSchema = z.object({
  body: z.object({
    productName: z.string().min(1, "Name is required"),
    variant: z.string().min(1, "Variant is required."),
    price: z.number().positive("Price must be a positive number"),
    quantity: z.number().positive("Quantity must be a positive number"),
  }),
});

export const updateVariantZodSchema = z.object({
  body: z.object({
    productName: z.string().min(1, "Name is required").optional(),
    variant: z.string().min(1, "Variant is required.").optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    quantity: z
      .number()
      .positive("Quantity must be a positive number")
      .optional(),
  }),
});

export const VariantValidation = {
  createVariantZodSchema,
  updateVariantZodSchema,
};
