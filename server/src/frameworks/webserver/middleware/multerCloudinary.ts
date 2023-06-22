import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Request, RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import configKeys from '../../../config';
import multer from 'multer';

interface CloudinaryStorageOptions {
  cloudinary: any; 
  params: {
    folder: string;
    resource_type: string;
    allowed_formats: string[];
    public_id: (req: Request, file: Express.Multer.File) => string;
  };
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: configKeys.CLOUD_NAME,
  api_key: configKeys.API_KEY,
  api_secret: configKeys.APP_SECRET
});

// Multer configuration
const storageOptions: CloudinaryStorageOptions = {
  cloudinary: cloudinary,
  params: {
    folder: 'Job-portal-profile',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    public_id: (req: Request, file: Express.Multer.File): string => {
      const fileName = file.originalname.split('.').slice(0, -1).join('.');
      return fileName;
    }
  }
};

const storage = new CloudinaryStorage(storageOptions);
const upload: RequestHandler = multer({ storage: storage }).single('image');

export { upload };