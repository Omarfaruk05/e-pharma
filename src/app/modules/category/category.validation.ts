import { z } from "zod";

export const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    thumbnail: z.string().url("Thumbnail must be a valid URL"),
  }),
});

export const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
