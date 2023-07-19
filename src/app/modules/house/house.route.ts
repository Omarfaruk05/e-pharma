import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { HouseController } from "./house.controller";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";
import { HouseValidation } from "./house.validation";

const router = express.Router();

// create House
router.post(
  "/create-house",
  auth(ENUM_ROLE.OWNER),
  validateRequest(HouseValidation.createHouseZodSchema),
  HouseController.createHouse
);

// get all House
router.get("/get-house", HouseController.getAllHouse);

// get a House with id
router.get("/get-single-house/:id", HouseController.getSingleHouse);

// update House
router.patch(
  "/update-house/:id",
  auth(ENUM_ROLE.OWNER, ENUM_ROLE.RENTER),
  validateRequest(HouseValidation.updateHouseZodSchema),
  HouseController.updateHouse
);

// delete House
router.delete(
  "/delete-house/:id",
  auth(ENUM_ROLE.OWNER),
  HouseController.deleteHouse
);

export const HouseRoutes = router;
