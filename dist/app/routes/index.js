"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const userOTPVerification_route_1 = require("../modules/userOTPVerifiaction/userOTPVerification.route");
const category_route_1 = require("../modules/category/category.route");
const variant_route_1 = require("../modules/variant/variant.route");
const product_route_1 = require("../modules/product/product.route");
const shippingAddress_route_1 = require("../modules/shippingAddress/shippingAddress.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/otp",
        route: userOTPVerification_route_1.UserOTPVerificationRoute,
    },
    {
        path: "/category",
        route: category_route_1.CategoryRoute,
    },
    {
        path: "/variant",
        route: variant_route_1.VariantRoute,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoute,
    },
    {
        path: "/shippingAddress",
        route: shippingAddress_route_1.ShippingAddressRoute,
    },
    {
        path: "/order",
        route: order_route_1.OrderRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
