import express from "express";
import { CowController } from "./house.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CowValidation } from "./house.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// create cow
router.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

// get all cow
router.get("/", CowController.getAllCows);

// get a cow with id
router.get("/:id", CowController.getSingleCow);

// update cow
router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

// delete cow
router.delete("/:id", CowController.deleteCow);

export const HouseRoutes = router;
