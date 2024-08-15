import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";
import { ShippingAddressController } from "./shippingAddress.controller";
import { ShippingAddressValidation } from "./shippingAddress.validation";

const router = express.Router();

// create Shipping Address
router.post(
  "/",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.USER),
  validateRequest(ShippingAddressValidation.createShippingAddressZodSchema),
  ShippingAddressController.createShippingAddress
);

// get all Shipping Address
router.get("/", ShippingAddressController.getAllShippingAddresses);

// get a Shipping Address with id
router.get("/:id", ShippingAddressController.getSingleShippingAddress);

// update Shipping Address
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(ShippingAddressValidation.updateShippingAddressZodSchema),
  ShippingAddressController.updateShippingAddress
);

// delete Shipping Address
router.delete(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  ShippingAddressController.deleteShippingAddress
);

export const ShippingAddressRoute = router;
