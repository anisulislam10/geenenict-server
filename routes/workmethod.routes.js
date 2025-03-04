import express from "express";
import { createWorkMethod,
    getWorkMethod,
    getWorkMethodById,
    updateWorkMethod,
    deleteWorkMethod,
 } from "../controllers/workmethod.controller.js";

const router = express.Router();

router.post("/create", createWorkMethod);
router.get("/get", getWorkMethod);
router.put("/update/:id", updateWorkMethod); // Update a WorkMethod by ID
router.delete("/delete", deleteWorkMethod);
router.get("/:id", getWorkMethodById);      // Get a specific WorkMethod by ID
router.delete("/delete/:id", deleteWorkMethod); // Delete a WorkMethod by ID


export default router;
