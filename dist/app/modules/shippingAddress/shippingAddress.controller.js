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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const shippingAddress_service_1 = require("./shippingAddress.service");
const shippingAddress_constant_1 = require("./shippingAddress.constant");
const createShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ShippingAddressData = req.body;
    const result = yield shippingAddress_service_1.ShippingAddressService.createShippingAddressService(ShippingAddressData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "ShippingAddress created successfully.",
        data: result,
    });
}));
const getAllShippingAddresses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, shippingAddress_constant_1.shippingAddressFilterableFilds);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield shippingAddress_service_1.ShippingAddressService.getAllShippingAddressesService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All ShippingAddresss retrieved successfully.",
        data: result,
    });
}));
const getSingleShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield shippingAddress_service_1.ShippingAddressService.getSingleShippingAddressService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "ShippingAddress retrieved successfully.",
        data: result,
    });
}));
const updateShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield shippingAddress_service_1.ShippingAddressService.updateShippingAddressService(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "ShippingAddress updated successfully.",
        data: result,
    });
}));
const deleteShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield shippingAddress_service_1.ShippingAddressService.deleteShippingAddressService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "ShippingAddress deleted successfully.",
        data: result,
    });
}));
exports.ShippingAddressController = {
    createShippingAddress,
    getAllShippingAddresses,
    getSingleShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
};
