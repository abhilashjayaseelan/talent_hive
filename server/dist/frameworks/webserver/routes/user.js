"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = () => {
    const route = express_1.default.Router();
    route.get('/', (req, res) => {
        res.send('Yup you are on the right track');
    });
    return route;
};
exports.default = userRouter;
