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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryMongoDB = void 0;
const UserEntity_1 = require("../../../../entities/UserEntity");
const UserRepositoryMongoDB = (model) => {
    const userEntity = new UserEntity_1.UserEntity(model);
    // getting the registered user by the email id
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userEntity.getUserByEmail(email);
        return user;
    });
    // adding a new user
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield userEntity.creteUser(user);
        return newUser;
    });
    const getUserDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield userEntity.getUserDataById(id);
        return userData;
    });
    const updateUser = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield userEntity.updateUser(userId, updates);
        return updatedUser;
    });
    const deleteResume = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield userEntity.resumeDelete(userId);
    });
    return {
        getUserByEmail,
        createUser,
        getUserDataById,
        updateUser,
        deleteResume
    };
};
exports.UserRepositoryMongoDB = UserRepositoryMongoDB;
