import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { HouseRoutes } from "../modules/house/house.route";
import { AuthRoutes } from "../modules/auth/auth.route";
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
    path: "/house",
    route: HouseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
