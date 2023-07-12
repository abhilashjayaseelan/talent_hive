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
exports.EmployerEntity = void 0;
class EmployerEntity {
    constructor(model) {
        this.model = model;
    }
    getEmployerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const employer = yield this.model.findOne({ email }).exec();
            return employer;
        });
    }
    createEmployer(employer) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployer = yield this.model.create(employer);
            return newEmployer;
        });
    }
    getEmployerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employer = yield this.model.findById(id);
            return employer;
        });
    }
    updateEmployer(employerId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDetails = yield this.model.findById(employerId);
            Object.assign(currentDetails !== null && currentDetails !== void 0 ? currentDetails : {}, updates);
            const updatedEmployer = yield (currentDetails === null || currentDetails === void 0 ? void 0 : currentDetails.save());
            return updatedEmployer;
        });
    }
}
exports.EmployerEntity = EmployerEntity;
