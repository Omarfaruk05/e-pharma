"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shippingAddress_controller_1 = require("./shippingAddress.controller");
const shippingAddress_validation_1 = require("./shippingAddress.validation");
const router = express_1.default.Router();
// create Shipping Address
router.post("/", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(shippingAddress_validation_1.ShippingAddressValidation.createShippingAddressZodSchema), shippingAddress_controller_1.ShippingAddressController.createShippingAddress);
// get all Shipping Address
router.get("/", shippingAddress_controller_1.ShippingAddressController.getAllShippingAddresses);
// get a Shipping Address with id
router.get("/:id", shippingAddress_controller_1.ShippingAddressController.getSingleShippingAddress);
// update Shipping Address
router.patch("/:id", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(shippingAddress_validation_1.ShippingAddressValidation.updateShippingAddressZodSchema), shippingAddress_controller_1.ShippingAddressController.updateShippingAddress);
// delete Shipping Address
router.delete("/:id", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
shippingAddress_controller_1.ShippingAddressController.deleteShippingAddress);
exports.ShippingAddressRoute = router;
