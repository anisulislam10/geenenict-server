import express from "express";
import upload from "../config/multer.js"; 
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";

const router = express.Router();


router.post("/post",upload.single("image"), createClient);
router.get("/getAll", getAllClients);
router.get("/:id", getClientById);
router.put("/update/:id", upload.single("image"), updateClient);
router.delete("/delete/:id", deleteClient);

export default router;
