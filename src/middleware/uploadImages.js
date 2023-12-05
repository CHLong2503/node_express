import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinaryConfig.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "node-express",
    format: "jpg",
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
