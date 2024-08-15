"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
// Route to create a new category
router.post("/", 
//   auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.createCategory);
// Route to get all categories or a single category by ID
router.get("/", category_controller_1.CategoryController.getAllCategories);
router.get("/:id", category_controller_1.CategoryController.getSingleCategory);
// Route to update an existing category
router.patch("/:id", 
//   auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryZodSchema), category_controller_1.CategoryController.updateCategory);
// Route to delete a category by ID
router.delete("/:id", 
//   auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoute = router;
