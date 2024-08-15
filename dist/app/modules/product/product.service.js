"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_constant_1 = require("../product/product.constant");
const product_model_1 = require("./product.model");
const createProductService = (variantData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(variantData);
    return result;
});
const getAllProductsService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice, primaryId } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice", "primaryId"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search term filter
    if (searchTerm) {
        andConditions.push({
            $or: product_constant_1.productSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // Price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
        andConditions.push({
            price: Object.assign(Object.assign({}, (minPrice !== undefined && { $gte: minPrice })), (maxPrice !== undefined && { $lte: maxPrice })),
        });
    }
    // Primary category filter
    if (primaryId) {
        andConditions.push({
            "categories.primary": primaryId,
        });
    }
    // Additional filters
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: {
                    $regex: `^${value}$`,
                    $options: "i",
                },
            })),
        });
    }
    // Sorting conditions
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // Applying conditions
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // Fetching data
    const result = yield product_model_1.Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate({
        path: "categories.primary",
        select: "name slug",
    })
        .populate({
        path: "categories.secondary",
        select: "name slug",
    })
        .populate({
        path: "categories.tertiary",
        select: "name slug",
    })
        .populate({
        path: "variants",
    })
        .exec();
    const total = yield product_model_1.Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id)
        .populate({
        path: "categories.primary",
        select: "name slug",
    })
        .populate({
        path: "categories.secondary",
        select: "name slug",
    })
        .populate({
        path: "categories.tertiary",
        select: "name slug",
    })
        .populate({
        path: "variants",
    })
        .exec();
    return result;
});
const updateProductService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found!");
    }
    return result;
});
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found!");
    }
    return result;
});
exports.ProductService = {
    createProductService,
    getAllProductsService,
    getSingleProductService,
    updateProductService,
    deleteProductService,
};
