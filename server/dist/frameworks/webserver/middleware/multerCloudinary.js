"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = __importDefault(require("../../../config"));
const multer_1 = __importDefault(require("multer"));
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: config_1.default.CLOUD_NAME,
    api_key: config_1.default.API_KEY,
    api_secret: config_1.default.APP_SECRET
});
// Multer configuration
const storageOptions = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'Job-portal-profile',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        public_id: (req, file) => {
            const fileName = file.originalname.split('.').slice(0, -1).join('.');
            return fileName;
        }
    }
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage(storageOptions);
const upload = (0, multer_1.default)({ storage: storage }).single('image');
exports.upload = upload;
