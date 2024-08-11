import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserOTPVerificationRoute } from "../modules/userOTPVerifiaction/userOTPVerification.route";
import { CategoryRoute } from "../modules/category/category.route";
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
  {
    path: "/category",
    route: CategoryRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
