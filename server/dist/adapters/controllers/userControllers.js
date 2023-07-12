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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const appError_1 = __importDefault(require("../../utils/appError"));
const httpStatus_1 = require("../../types/httpStatus");
const user_1 = require("../../app/useCases/user/user");
const userController = (userDbRepository, userDbRepositoryImpl, userModel) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));
    const getUserByEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const user = yield (0, user_1.findByEmail)(email, dbRepositoryUser);
        res.json(user);
    }));
    // get user by toke id
    const getUserDataById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const customReq = req;
        const id = (_a = customReq.payload) !== null && _a !== void 0 ? _a : "";
        const userData = yield (0, user_1.findUserDataById)(id, dbRepositoryUser);
        res.json(userData);
    }));
    // by id in param
    const getUserDataByIdParam = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        const id = (_c = (_b = req.params) === null || _b === void 0 ? void 0 : _b.userId) !== null && _c !== void 0 ? _c : "";
        const userData = yield (0, user_1.findUserDataById)(id, dbRepositoryUser);
        res.json(userData);
    }));
    const updateTheUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e, _f;
        const customReq = req;
        const id = (_d = customReq.payload) !== null && _d !== void 0 ? _d : '';
        if (!id) {
            throw new appError_1.default('Unauthorized request.. invalid token', httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        const update = req.body;
        if ((_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.path) {
            update.image = (_f = req === null || req === void 0 ? void 0 : req.file) === null || _f === void 0 ? void 0 : _f.path;
        }
        const updateUserProfile = yield (0, user_1.updateUser)(id, update, dbRepositoryUser);
        res.json({
            status: 'success',
            updateUserProfile
        });
    }));
    const updateTheResume = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        const customReq = req;
        const id = (_g = customReq.payload) !== null && _g !== void 0 ? _g : '';
        if (!id) {
            throw new appError_1.default('Unauthorized request.. invalid token', httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        const update = {};
        update.resume = (_h = req === null || req === void 0 ? void 0 : req.file) === null || _h === void 0 ? void 0 : _h.path;
        const updateUserResume = yield (0, user_1.updateResume)(id, update, dbRepositoryUser);
        res.json({
            status: 'success',
            updateUserResume
        });
    }));
    const userDeleteResume = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        const customReq = req;
        const id = (_j = customReq.payload) !== null && _j !== void 0 ? _j : '';
        if (!id) {
            throw new appError_1.default('Unauthorized request invalid token', httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        yield (0, user_1.deleteResume)(id, dbRepositoryUser);
        res.json({
            status: 'success',
            message: 'resume deleted successfully'
        });
    }));
    return {
        getUserByEmail,
        getUserDataById,
        updateTheUser,
        updateTheResume,
        userDeleteResume,
        getUserDataByIdParam
    };
};
exports.default = userController;
