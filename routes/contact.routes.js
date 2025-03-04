import express from "express";
import {
    sendMessage ,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAll", getAllContacts);
router.get("/:id", getContactById);
router.delete("/delete/:id", deleteContact);

export default router;
