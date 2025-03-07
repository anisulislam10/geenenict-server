import express from "express";
import upload from "../config/multer.js"; 

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/post", upload.single("image"), createProject);
router.get("/getAll", getAllProjects);
router.get("/:id", getProjectById);
router.put("/update/:id",  upload.single("image"),updateProject);
router.delete("/delete/:id", deleteProject);

export default router;
