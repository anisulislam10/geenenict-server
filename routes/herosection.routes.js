import express from "express";
import multer from "multer";
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection,
} from "../controllers/herosection.controller.js";

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

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept any image type (jpeg, png, webp, gif, etc.)
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB for security
});

router.post("/post", upload.single("image"), createHeroSection);
router.get("/getAll", getAllHeroSections);
router.get("/:id", getHeroSectionById);
router.put("/update/:id", upload.single("image"), updateHeroSection);
router.delete("/delete/:id", deleteHeroSection);

export default router;
