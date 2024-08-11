import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";

const router = express.Router();

// create House
router.post(
  "/",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

// get all House
router.get("/", ProductController.getAllProducts);

// get a House with id
router.get("/:id", ProductController.getSingleProduct);

// update House
router.patch(
  "/:id",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);

// delete House
router.delete(
  "/:id",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  ProductController.deleteProduct
);

export const ProductRoute = router;
