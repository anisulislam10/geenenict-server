import express from "express";
import upload from "../config/multer.js"; 
import {
  createNavbar,
  getAllNavbars,
  getNavbarById,
  updateNavbar,
  deleteNavbar,
} from "../controllers/navbar.controller.js";

const router = express.Router();

router.post("/post", upload.single("logo"), createNavbar);
router.get("/getAll", getAllNavbars);
router.get("/:id", getNavbarById);
router.put("/update/:id", upload.single("logo"), updateNavbar);
router.delete("/delete/:id", deleteNavbar);

export default router;
