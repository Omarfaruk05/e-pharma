"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOTPVerificationRoute = void 0;
const express_1 = __importDefault(require("express"));
const userOTPVerification_controller_1 = require("./userOTPVerification.controller");
const router = express_1.default.Router();
router.post("/verifyOTP", userOTPVerification_controller_1.UserOTPVerificationController.verifyOTP);
router.post("/resendOTPVerification", userOTPVerification_controller_1.UserOTPVerificationController.recendOTPVerification);
exports.UserOTPVerificationRoute = router;
