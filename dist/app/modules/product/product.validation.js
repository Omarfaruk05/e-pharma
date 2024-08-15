"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    primary: zod_1.z.string().optional(),
    secondary: zod_1.z.string().optional(),
    tertiary: zod_1.z.string().optional(),
});
const variantSchema = zod_1.z.string().optional();
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Product name is required.",
        }),
        slug: zod_1.z
            .string({
            required_error: "Product slug is required.",
        })
            .min(1, "Slug must be at least 1 character long."),
        photos: zod_1.z.array(zod_1.z.string().url()).nonempty({
            message: "At least one photo URL is required.",
        }),
        description: zod_1.z.string({
            required_error: "Product description is required.",
        }),
        metaKey: zod_1.z.string().optional(),
        price: zod_1.z
            .number({
            required_error: "Product price is required.",
        })
            .min(0, "Price must be a positive number."),
        discount: zod_1.z
            .number()
            .min(0, "Discount must be a positive number.")
            .optional(),
        stockStatus: zod_1.z.boolean().optional(),
        status: zod_1.z.boolean().optional(),
        categories: categorySchema.optional(),
        variants: zod_1.z.array(variantSchema).optional(),
    }),
});
const updateProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slug: zod_1.z.string().min(1).optional(),
        photos: zod_1.z.array(zod_1.z.string().url()).optional(),
        description: zod_1.z.string().optional(),
        metaKey: zod_1.z.string().optional(),
        price: zod_1.z.number().min(0, "Price must be a positive number.").optional(),
        discount: zod_1.z
            .number()
            .min(0, "Discount must be a positive number.")
            .optional(),
        stockStatus: zod_1.z.boolean().optional(),
        status: zod_1.z.boolean().optional(),
        categories: zod_1.z
            .object({
            primary: zod_1.z.string().uuid().optional(),
            secondary: zod_1.z.string().uuid().optional(),
            tertiary: zod_1.z.string().uuid().optional(),
        })
            .optional(),
        variants: zod_1.z.array(variantSchema).optional(),
    }),
});
exports.ProductValidation = {
    createProductZodSchema,
    updateProductZodSchema,
};
