"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const variant_controller_1 = require("./variant.controller");
const variant_validation_1 = require("./variant.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// create variant
router.post("/", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(variant_validation_1.VariantValidation.createVariantZodSchema), variant_controller_1.VariantController.createVariant);
// get variant
router.get("/", variant_controller_1.VariantController.getAllVariants);
router.get("/:id", variant_controller_1.VariantController.getSingleVariant);
// update variant
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(variant_validation_1.VariantValidation.updateVariantZodSchema), variant_controller_1.VariantController.updateVariant);
// delete variant
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.SUPER_ADMIN), variant_controller_1.VariantController.deleteVariant);
exports.VariantRoute = router;
