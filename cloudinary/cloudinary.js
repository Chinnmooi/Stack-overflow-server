// export const cloudinary = require('cloudinary').v2;
// const {CloudinaryStorage} = require("multer-storage-cloudinary");
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
export const cloud = cloudinary.v2
export const storage = new CloudinaryStorage({
    cloudinary: cloud,
    params: {
      folder: 'Stack-OverFlow-Clone',
      
      params: {
        allowedFormats:['jpeg','png','jpg'],
        folder: 'Stack-Overflow-Clone',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
      },
    },
  });  