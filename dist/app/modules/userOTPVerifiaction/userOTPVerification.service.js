"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOTPVerificationService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userOTPVerifiaction_model_1 = require("./userOTPVerifiaction.model");
const userOTPVerification_utils_1 = require("./userOTPVerification.utils");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const sendOTPVerificationEmail = ({ _id, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: "",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b> ${otp} </b> in the app to verify your email address and complete the registration.<p>
            <p> This code <b> expires in 1 hour</b>. </p>`,
        };
        const hashedOTP = yield bcrypt_1.default.hash(otp, Number(config_1.default.bcrypt_sald_round));
        yield user_model_1.User.findByIdAndUpdate({ _id }, { isEmailVerified: false });
        const newOTPVerification = yield userOTPVerifiaction_model_1.UserOTPVerification.create({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3500000,
        });
        yield userOTPVerification_utils_1.transporter.sendMail(mailOptions);
        return newOTPVerification;
    }
    catch (error) {
        return error.message;
    }
});
const verifyOTP = ({ userId, otp }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Empty otp details are not allowed.");
    }
    const UserOTPVerificationRecords = yield userOTPVerifiaction_model_1.UserOTPVerification.find({ userId });
    if (UserOTPVerificationRecords.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Account record doesn't exist or has been verified already. Please sign up or login.");
    }
    const { expiresAt, otp: hashedOTP } = UserOTPVerificationRecords[0];
    if (expiresAt.getTime() < Date.now()) {
        userOTPVerifiaction_model_1.UserOTPVerification.deleteMany({ userId });
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Code has expired. Please request again.");
    }
    const validOTP = yield bcrypt_1.default.compare(otp, hashedOTP);
    if (!validOTP) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid code passed. Check your inbox.");
    }
    yield user_model_1.User.updateOne({ _id: userId }, { isEmailVerified: true });
    yield userOTPVerifiaction_model_1.UserOTPVerification.deleteMany({ userId });
    const user = yield user_model_1.User.findById({ _id: userId }, { password: 0 });
    return user;
});
const recendOTPVerification = ({ userId, email }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Empty otp details are not allowed.");
    }
    yield userOTPVerifiaction_model_1.UserOTPVerification.deleteMany({ userId });
    const result = yield sendOTPVerificationEmail({ _id: userId, email });
    return result;
});
exports.UserOTPVerificationService = {
    sendOTPVerificationEmail,
    verifyOTP,
    recendOTPVerification,
};
