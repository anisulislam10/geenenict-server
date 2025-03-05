import express from "express";
import upload from "../config/multer.js"; // Updated multer middleware
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection,
} from "../controllers/herosection.controller.js";

const router = express.Router();

router.post("/post", upload.single("image"), createHeroSection);
router.get("/getAll", getAllHeroSections);
router.get("/:id", getHeroSectionById);
router.put("/update/:id", upload.single("image"), updateHeroSection);
router.delete("/delete/:id", deleteHeroSection);

export default router;
