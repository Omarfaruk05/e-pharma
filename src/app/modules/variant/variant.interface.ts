import { Model, Types } from "mongoose";

export interface IVariant extends Document {
    _id: Types.ObjectId;
    name: string;
    price: number;
}

export type VariantModel = Model<IVariant, Record<string, unknown>>;