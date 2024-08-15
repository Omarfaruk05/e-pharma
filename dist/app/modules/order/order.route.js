"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
// create Order
router.post("/", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrder);
// get all Order
router.get("/", order_controller_1.OrderController.getAllOrders);
// get a Order with id
router.get("/:id", order_controller_1.OrderController.getSingleOrder);
// update Order
router.patch("/:id", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(order_validation_1.OrderValidation.updateOrderZodSchema), order_controller_1.OrderController.updateOrder);
// delete Order
router.delete("/:id", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
order_controller_1.OrderController.deleteOrder);
exports.OrderRoute = router;
