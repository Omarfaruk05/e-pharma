"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = exports.updateCategoryZodSchema = exports.createCategoryZodSchema = void 0;
const zod_1 = require("zod");
exports.createCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        slug: zod_1.z.string().min(1, "Slug is required"),
        thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL"),
    }),
});
exports.updateCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL").optional(),
    }),
});
exports.CategoryValidation = {
    createCategoryZodSchema: exports.createCategoryZodSchema,
    updateCategoryZodSchema: exports.updateCategoryZodSchema,
};
