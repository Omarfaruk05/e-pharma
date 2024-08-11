import { z } from "zod";

const categorySchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tertiary: z.string().optional(),
});

const variantSchema = z.string().optional();

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Product name is required.",
    }),
    slug: z
      .string({
        required_error: "Product slug is required.",
      })
      .min(1, "Slug must be at least 1 character long."),
    photos: z.array(z.string().url()).nonempty({
      message: "At least one photo URL is required.",
    }),
    description: z.string({
      required_error: "Product description is required.",
    }),
    metaKey: z.string().optional(),
    price: z
      .number({
        required_error: "Product price is required.",
      })
      .min(0, "Price must be a positive number."),
    discount: z
      .number()
      .min(0, "Discount must be a positive number.")
      .optional(),
    stockStatus: z.boolean().optional(),
    status: z.boolean().optional(),
    categories: categorySchema.optional(),
    variants: z.array(variantSchema).optional(),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().min(1).optional(),
    photos: z.array(z.string().url()).optional(),
    description: z.string().optional(),
    metaKey: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number.").optional(),
    discount: z
      .number()
      .min(0, "Discount must be a positive number.")
      .optional(),
    stockStatus: z.boolean().optional(),
    status: z.boolean().optional(),
    categories: z
      .object({
        primary: z.string().uuid().optional(),
        secondary: z.string().uuid().optional(),
        tertiary: z.string().uuid().optional(),
      })
      .optional(),
    variants: z.array(variantSchema).optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
