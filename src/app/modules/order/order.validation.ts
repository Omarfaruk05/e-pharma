import mongoose from "mongoose";
import { z } from "zod";

const orderProductSchema = z.object({
  product: z
    .string({ required_error: "Product ID is required." })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Product ID.",
    }),
  variant: z
    .string({ required_error: "Variant ID is required." })
    .optional()
    .refine((val: any) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Variant ID.",
    }),
  quantity: z.number({ required_error: "Quantity is required." }).min(1, {
    message: "Quantity must be at least 1.",
  }),
  price: z.number({ required_error: "Price is required." }).min(0, {
    message: "Price must be at least 0.",
  }),
});

const createOrderZodSchema = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "User ID is required." })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid User ID.",
      }),
    products: z
      .array(orderProductSchema)
      .nonempty({ message: "At least one product is required." }),
    shippingAddress: z
      .string({
        required_error: "Shipping Address ID is required.",
      })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid Shipping Address ID.",
      }),
    orderStatus: z
      .enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
      .optional(),
    paymentStatus: z.enum(["Pending", "Completed", "Failed"]).optional(),
    orderDate: z.string().optional(),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    userId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid User ID.",
      })
      .optional(),
    products: z
      .array(orderProductSchema)
      .nonempty({ message: "At least one product is required." })
      .optional(),
    shippingAddress: z
      .string()
      .refine((val: any) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid Shipping Address ID.",
      })
      .optional(),
    orderStatus: z
      .enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
      .optional(),
    paymentStatus: z.enum(["Pending", "Completed", "Failed"]).optional(),
    orderDate: z.date().optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
