import express from "express";
import upload from "../config/multer.js"; 
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactsection.controller.js";

const router = express.Router();



router.post("/post", upload.single("image"), createContact);
router.get("/getAll", getAllContacts);
router.get("/:id", getContactById);
router.put("/update/:id", upload.single("image"), updateContact);
router.delete("/delete/:id", deleteContact);

export default router;
