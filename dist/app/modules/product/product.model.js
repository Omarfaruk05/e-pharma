"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photos: { type: [String], required: true },
    description: { type: String, required: true },
    metaKey: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stockStatus: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
    categories: {
        primary: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
        secondary: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
        tertiary: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    },
    variants: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Variant" }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
