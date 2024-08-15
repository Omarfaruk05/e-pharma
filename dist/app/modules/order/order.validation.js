"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const orderProductSchema = zod_1.z.object({
    product: zod_1.z
        .string({ required_error: "Product ID is required." })
        .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid Product ID.",
    }),
    variant: zod_1.z
        .string({ required_error: "Variant ID is required." })
        .optional()
        .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid Variant ID.",
    }),
    quantity: zod_1.z.number({ required_error: "Quantity is required." }).min(1, {
        message: "Quantity must be at least 1.",
    }),
    price: zod_1.z.number({ required_error: "Price is required." }).min(0, {
        message: "Price must be at least 0.",
    }),
});
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string({ required_error: "User ID is required." })
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid User ID.",
        }),
        products: zod_1.z
            .array(orderProductSchema)
            .nonempty({ message: "At least one product is required." }),
        shippingAddress: zod_1.z
            .string({
            required_error: "Shipping Address ID is required.",
        })
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid Shipping Address ID.",
        }),
        orderStatus: zod_1.z
            .enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
            .optional(),
        paymentStatus: zod_1.z.enum(["Pending", "Completed", "Failed"]).optional(),
        orderDate: zod_1.z.string().optional(),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string()
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid User ID.",
        })
            .optional(),
        products: zod_1.z
            .array(orderProductSchema)
            .nonempty({ message: "At least one product is required." })
            .optional(),
        shippingAddress: zod_1.z
            .string()
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid Shipping Address ID.",
        })
            .optional(),
        orderStatus: zod_1.z
            .enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
            .optional(),
        paymentStatus: zod_1.z.enum(["Pending", "Completed", "Failed"]).optional(),
        orderDate: zod_1.z.date().optional(),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema,
};
