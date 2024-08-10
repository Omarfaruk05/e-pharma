import { Model } from "mongoose";
import { IProduct } from "../product/product.interface";
import { IShippingAddress } from "../shippingAddress/shippingAddress.interface";
import { IVariant } from "../variant/variant.interface";


export interface IOrder extends Document {
    products: {
        product: IProduct['_id'];
        variant?: IVariant['_id'];
        quantity: number;
        price: number;
    }[];
    shippingAddress: IShippingAddress['_id'];
    orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    orderDate: Date;
}


export type OrderModel = Model<IOrder, Record<string, unknown>>;