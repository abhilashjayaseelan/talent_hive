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
exports.deleteResume = exports.updateResume = exports.updateUser = exports.findUserDataById = exports.findByEmail = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const findByEmail = (email, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dbRepositoryUser.getUserByEmail(email);
        if (!user) {
            throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    catch (error) {
        throw new Error("failed to find the user");
    }
});
exports.findByEmail = findByEmail;
const findUserDataById = (id, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield dbRepositoryUser.getUserDataById(id);
        if (!userData) {
            throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return userData;
    }
    catch (error) {
        throw new Error("failed to get the user data");
    }
});
exports.findUserDataById = findUserDataById;
const updateUser = (userId, updates, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield dbRepositoryUser.updateUser(userId, updates);
        if (!updatedUser) {
            throw new appError_1.default('not found', httpStatus_1.HttpStatus.BAD_GATEWAY);
        }
        return updatedUser;
    }
    catch (error) {
        console.log(error);
        throw new Error("failed to update the user");
    }
});
exports.updateUser = updateUser;
const updateResume = (userId, updates, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResume = yield dbRepositoryUser.updateUser(userId, updates);
        if (!updateResume) {
            throw new appError_1.default('not found', httpStatus_1.HttpStatus.BAD_GATEWAY);
        }
        return updateResume;
    }
    catch (error) {
        throw new Error("failed to update resume");
    }
});
exports.updateResume = updateResume;
const deleteResume = (userId, dbRepositoryUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbRepositoryUser.deleteResume(userId);
    }
    catch (error) {
        throw new Error('failed to delete the resume');
    }
});
exports.deleteResume = deleteResume;
