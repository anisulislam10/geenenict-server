import express from "express";
import {
  createMetadata,
  getAllMetadata,
  getMetadataById,
  updateMetadata,
  deleteMetadata
} from "../controllers/metadata.controller.js";

const router = express.Router();

router.post("/post", createMetadata);
router.get("/get", getAllMetadata);
router.get("/:id", getMetadataById);
router.put("/update/:id", updateMetadata);
router.delete("delete/:id", deleteMetadata);

export default router;
