import express from "express";
import multer from "multer";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactsection.controller.js";

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Store uploaded images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), createContact);
router.get("/getAll", getAllContacts);
router.get("/:id", getContactById);
router.put("/update/:id", upload.single("image"), updateContact);
router.delete("/delete/:id", deleteContact);

export default router;
