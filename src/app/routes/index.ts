import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { HouseRoutes } from "../modules/product/product.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserOTPVerificationRoute } from "../modules/userOTPVerifiaction/userOTPVerification.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/otp",
    route: UserOTPVerificationRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
