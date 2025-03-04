import express from "express";
import {
  createRecentProject,
  getAllRecentProjects,
  getRecentProjectById,
  updateRecentProject,
  deleteRecentProject,
} from "../controllers/recentprojects.controller.js";

const router = express.Router();

router.post("/post", createRecentProject);
router.get("/getAll", getAllRecentProjects);
router.get("/:id", getRecentProjectById);
router.put("/update/:id", updateRecentProject);
router.delete("/delete/:id", deleteRecentProject);

export default router;
