import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";

const router = express.Router();

// create Order
router.post(
  "/",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

// get all Order
router.get("/", OrderController.getAllOrders);

// get a Order with id
router.get("/:id", OrderController.getSingleOrder);

// update Order
router.patch(
  "/:id",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrder
);

// delete Order
router.delete(
  "/:id",
  // auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  OrderController.deleteOrder
);

export const OrderRoute = router;
