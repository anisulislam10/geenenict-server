import express from "express";
import { createFooter, getFooter, updateFooter, deleteFooter } from "../controllers/footer.controller.js";

const router = express.Router();

router.post("/create", createFooter);
router.get("/get", getFooter);
router.put("/update", updateFooter);
router.delete("/delete", deleteFooter);

export default router;
