import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";

const router = express.Router();

// create product
router.post(
  "/",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

// get all product
router.get("/", ProductController.getAllProducts);

// get a product with id
router.get("/:id", ProductController.getSingleProduct);

// update product
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);

// delete product
router.delete(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  ProductController.deleteProduct
);

export const ProductRoute = router;
