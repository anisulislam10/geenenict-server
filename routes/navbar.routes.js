import express from "express";
import multer from 'multer';
import {
  createNavbar,
  getAllNavbars,
  getNavbarById,
  updateNavbar,
  deleteNavbar,
} from "../controllers/navbar.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

router.post("/post", upload.single('logo'),  createNavbar);
router.get("/getAll", getAllNavbars);
router.get("/:id", getNavbarById);
router.put("/update/:id",upload.single('logo'), updateNavbar);
router.delete("/delete/:id", deleteNavbar);

export default router;
