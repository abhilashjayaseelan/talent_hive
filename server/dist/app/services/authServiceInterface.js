"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = (password) => service.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const generateToken = (payload, role) => service.generateToken({ payload, role });
    const verifyToken = (token) => service.verifyToken(token);
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
    };
};
exports.authServiceInterface = authServiceInterface;
