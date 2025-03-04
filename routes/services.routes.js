import express from "express";
import multer from "multer";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), createService);
router.get("/getAll", getAllServices);
router.get("/:id", getServiceById);
router.put("/update/:id", upload.single("image"), updateService);
router.delete("/delete/:id", deleteService);

export default router;
