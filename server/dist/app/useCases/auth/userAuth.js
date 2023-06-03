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
exports.userLogin = exports.registerUser = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
// creating a new user
const registerUser = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    user.email = user.email.toLowerCase();
    const isExistingEmail = yield userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new appError_1.default("email already exists", httpStatus_1.HttpStatus.CONFLICT);
    }
    user.password = yield authService.encryptPassword((_a = user.password) !== null && _a !== void 0 ? _a : "");
    const result = yield userRepository.createUser(user);
    return result;
});
exports.registerUser = registerUser;
// user login
const userLogin = (email, password, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user does not exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, (_b = user.password) !== null && _b !== void 0 ? _b : "");
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, incorrect password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    return token;
});
exports.userLogin = userLogin;
