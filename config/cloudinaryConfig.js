import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "services_uploads", // Cloud folder name
    format: async (req, file) => "png", // Change format if needed
    public_id: (req, file) => file.originalname.split(".")[0], // Unique ID
  },
});

const upload = multer({ storage });

export { upload, cloudinary };
