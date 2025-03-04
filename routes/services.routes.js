import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";
import { upload } from "../config/cloudinaryConfig.js"; // Import Cloudinary upload

const router = express.Router();

router.post("/post", upload.single("image"), createService);
router.get("/getAll", getAllServices);
router.get("/:id", getServiceById);
router.put("/update/:id", upload.single("image"), updateService);
router.delete("/delete/:id", deleteService);

export default router;
