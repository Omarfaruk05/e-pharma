import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();
//get all users route
router.get("/", UserController.getAllUsers);

//get my profile route
router.get("/my-profile", UserController.getMyProfile);

//update my profile route
router.patch(
  "/my-profile",
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateMyProfile
);

//get single user route
router.get("/:id", UserController.getSingleUser);

//update single user route
router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// delete single user route
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
