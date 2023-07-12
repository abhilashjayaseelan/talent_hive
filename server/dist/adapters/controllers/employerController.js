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
const employerController = (employerDbRepository, employerDbRepositoryImpl, employerModel) => {
    const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl(employerModel));
    //for getting the data with token data.
    const getEmployerById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const customReq = req;
        const id = (_a = customReq.payload) !== null && _a !== void 0 ? _a : "";
        const employerData = yield dbRepositoryEmployer.findEmployerById(id);
        res.json({ status: "success", employerData });
    }));
    //for getting the data with id only.
    const getEmployerByIdParam = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const employerId = req.params.empId;
        const employerData = yield dbRepositoryEmployer.findEmployerById(employerId);
        res.json(employerData);
    }));
    const updateEmployer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d;
        const customReq = req;
        const employerId = (_b = customReq.payload) !== null && _b !== void 0 ? _b : "";
        if (!employerId) {
            throw new appError_1.default("unauthorized request, invalid token", httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        const updates = req.body;
        if ((_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.path) {
            updates.image = (_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.path;
        }
        const updatedEmployer = yield dbRepositoryEmployer.updateEmployer(employerId, updates);
        res.json({
            status: 'success',
            updatedEmployer
        });
    }));
    return {
        getEmployerById,
        updateEmployer,
        getEmployerByIdParam
    };
};
exports.default = employerController;
