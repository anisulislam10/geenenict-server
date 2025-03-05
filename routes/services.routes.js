import express from "express";
import upload from "../config/multer.js"; // Updated multer
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

const router = express.Router();

router.post("/post", upload.single("image"), createService);
router.get("/getAll", getAllServices);
router.get("/:id", getServiceById);
router.put("/update/:id", upload.single("image"), updateService);
router.delete("/delete/:id", deleteService);

export default router;
