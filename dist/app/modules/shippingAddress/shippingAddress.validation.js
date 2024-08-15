"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressValidation = void 0;
const zod_1 = require("zod");
const createShippingAddressZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        division: zod_1.z.string({
            required_error: "Divition is required.",
        }),
        district: zod_1.z.string({
            required_error: "District is required.",
        }),
        subDistrict: zod_1.z.string({
            required_error: "Sub-District is required.",
        }),
        address: zod_1.z.string({
            required_error: "Address is required.",
        }),
        name: zod_1.z.string({
            required_error: "Name is required.",
        }),
        phone: zod_1.z.string({
            required_error: "Phone number is required.",
        }),
    }),
});
const updateShippingAddressZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        division: zod_1.z.string().optional(),
        district: zod_1.z.string().optional(),
        subDistrict: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    }),
});
exports.ShippingAddressValidation = {
    createShippingAddressZodSchema,
    updateShippingAddressZodSchema,
};
