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
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), createHeroSection);
router.get("/getAll", getAllHeroSections);
router.get("/:id", getHeroSectionById);
router.put("/update/:id", upload.single("image"), updateHeroSection);
router.delete("/delete/:id", deleteHeroSection);

export default router;
