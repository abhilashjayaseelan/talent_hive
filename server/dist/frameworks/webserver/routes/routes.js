"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuth_1 = __importDefault(require("./userAuth"));
const employerAuth_1 = __importDefault(require("./employerAuth"));
const jobs_1 = __importDefault(require("./jobs"));
const user_1 = __importDefault(require("./user"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const employer_1 = __importDefault(require("./employer"));
const jobApplication_1 = __importDefault(require("./jobApplication"));
const conversation_1 = __importDefault(require("./conversation"));
const message_1 = __importDefault(require("./message"));
const routes = (app) => {
    app.use('/api/user', (0, user_1.default)());
    app.use('/api/employer', (0, employer_1.default)());
    app.use('/api/user-auth', (0, userAuth_1.default)());
    app.use('/api/employer-auth', (0, employerAuth_1.default)());
    app.use('/api/job', authenticationMiddleware_1.default, (0, jobs_1.default)());
    app.use('/api/job-application', authenticationMiddleware_1.default, (0, jobApplication_1.default)());
    app.use('/api/messenger-conversation', (0, conversation_1.default)());
    app.use('/api/messenger-message', authenticationMiddleware_1.default, (0, message_1.default)());
};
exports.default = routes;
