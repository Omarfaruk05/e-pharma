import express from "express";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";

const router = express.Router();

// user login route
router.post(
  "/login",
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser
);
// refresh token route
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
