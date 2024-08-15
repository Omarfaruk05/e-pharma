"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
// create House
router.post("/", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductZodSchema), product_controller_1.ProductController.createProduct);
// get all House
router.get("/", product_controller_1.ProductController.getAllProducts);
// get a House with id
router.get("/:id", product_controller_1.ProductController.getSingleProduct);
// update House
router.patch("/:id", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductZodSchema), product_controller_1.ProductController.updateProduct);
// delete House
router.delete("/:id", 
// auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
product_controller_1.ProductController.deleteProduct);
exports.ProductRoute = router;
