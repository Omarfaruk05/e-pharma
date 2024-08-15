import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new category
router.post(
  "/",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

// Route to get all categories or a single category by ID
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getSingleCategory);

// Route to update an existing category
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

// Route to delete a category by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoute = router;
