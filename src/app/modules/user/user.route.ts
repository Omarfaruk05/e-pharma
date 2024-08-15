import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/create-user", UserController.createUser);

//get all users route
router.get(
  "/",
  // auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.USER),
  UserController.getAllUsers
);

//get single user route
router.get(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.USER),
  UserController.getSingleUser
);

//update single user route
router.patch(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.USER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// delete single user route
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
