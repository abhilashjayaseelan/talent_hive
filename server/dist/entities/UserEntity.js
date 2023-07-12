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
exports.UserEntity = void 0;
class UserEntity {
    constructor(model) {
        this.model = model;
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ email });
            return user;
        });
    }
    creteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.model.create(user);
            return newUser;
        });
    }
    getUserDataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.model.findById(id);
            return userData;
        });
    }
    updateUser(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDetails = yield this.model.findById(id);
            if (currentDetails) {
                if (updates.skills) {
                    currentDetails.skills = updates.skills;
                }
                Object.assign(currentDetails, updates);
                const updatedUser = yield currentDetails.save();
                return updatedUser;
            }
            return null;
        });
    }
    resumeDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({ _id: id }, { $unset: { resume: "" } });
        });
    }
}
exports.UserEntity = UserEntity;
