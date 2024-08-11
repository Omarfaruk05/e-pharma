import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { VariantController } from "./variant.controller";
import { VariantValidation } from "./variant.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// create variant
router.post(
  "/",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(VariantValidation.createVariantZodSchema),
  VariantController.createVariant
);

// get variant
router.get("/", VariantController.getAllVariants);
router.get("/:id", VariantController.getSingleVariant);

// update variant
router.patch(
  "/:id",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(VariantValidation.updateVariantZodSchema),
  VariantController.updateVariant
);

// delete variant
router.delete(
  "/:id",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  VariantController.deleteVariant
);

export const VariantRoute = router;
