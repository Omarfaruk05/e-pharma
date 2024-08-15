"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValidation = exports.updateVariantZodSchema = exports.createVariantZodSchema = void 0;
const zod_1 = require("zod");
exports.createVariantZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().min(1, "Name is required"),
        variant: zod_1.z.string().min(1, "Variant is required."),
        price: zod_1.z.number().positive("Price must be a positive number"),
        quantity: zod_1.z.number().positive("Quantity must be a positive number"),
    }),
});
exports.updateVariantZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().min(1, "Name is required").optional(),
        variant: zod_1.z.string().min(1, "Variant is required.").optional(),
        price: zod_1.z.number().positive("Price must be a positive number").optional(),
        quantity: zod_1.z
            .number()
            .positive("Quantity must be a positive number")
            .optional(),
    }),
});
exports.VariantValidation = {
    createVariantZodSchema: exports.createVariantZodSchema,
    updateVariantZodSchema: exports.updateVariantZodSchema,
};
