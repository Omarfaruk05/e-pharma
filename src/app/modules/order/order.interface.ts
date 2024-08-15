import { Model } from "mongoose";
import { IProduct } from "../product/product.interface";
import { IShippingAddress } from "../shippingAddress/shippingAddress.interface";
import { IVariant } from "../variant/variant.interface";
import { IUser } from "../user/user.interface";

export interface IOrder extends Document {
  userId: IUser["_id"];
  products: {
    product: string;
    variant?: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: IShippingAddress["_id"];
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderDate: string;
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;

export type IOrderFilter = {
  searchTerm?: string;
  userId?: string;
  orderStarus?: string;
  paymentStatus?: string;
};
