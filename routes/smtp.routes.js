import express from "express";
import SMTP  from "../models/smtp.models.js";

const router = express.Router();

// Save SMTP Settings (Create or Update if Exists)
router.post("/save", async (req, res) => {
  try {
    const existingSMTP = await SMTP.findOne();
    if (existingSMTP) {
      // Update existing SMTP settings
      const updatedSMTP = await SMTP.findByIdAndUpdate(existingSMTP._id, req.body, { new: true });
      return res.status(200).json({ message: "SMTP settings updated successfully", smtp: updatedSMTP });
    } else {
      // Create new settings
      const smtp = await SMTP.create(req.body);
      return res.status(201).json({ message: "SMTP settings saved successfully", smtp });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving SMTP settings", error });
  }
});

// Get SMTP Settings
router.get("/get", async (req, res) => {
  try {
    const smtp = await SMTP.findOne();
    res.status(200).json(smtp);
  } catch (error) {
    res.status(500).json({ message: "Error fetching SMTP settings", error });
  }
});

// Update SMTP Settings by ID
router.put("/:id", async (req, res) => {
  try {
    const smtp = await SMTP.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!smtp) return res.status(404).json({ message: "SMTP settings not found" });
    res.status(200).json({ message: "SMTP settings updated successfully", smtp });
  } catch (error) {
    res.status(500).json({ message: "Error updating SMTP settings", error });
  }
});

// Delete SMTP Settings by ID
router.delete("/:id", async (req, res) => {
  try {
    const smtp = await SMTP.findByIdAndDelete(req.params.id);
    if (!smtp) return res.status(404).json({ message: "SMTP settings not found" });
    res.status(200).json({ message: "SMTP settings deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting SMTP settings", error });
  }
});

export default router;
