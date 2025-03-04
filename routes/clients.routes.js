import express from "express";
import multer from "multer";
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";

const router = express.Router();

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), createClient);
router.get("/getAll", getAllClients);
router.get("/:id", getClientById);
router.put("/update/:id", upload.single("image"), updateClient);
router.delete("/delete/:id", deleteClient);

export default router;
