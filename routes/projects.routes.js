import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/post", createProject);
router.get("/getAll", getAllProjects);
router.get("/:id", getProjectById);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

export default router;
