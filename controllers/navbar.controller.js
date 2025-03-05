import fs from "fs";
import { Navbar } from "../models/navbar.models.js";

// Create Navbar Item
export const createNavbar = async (req, res) => {
  try {
    const { logoText, buttonText } = req.body;
    let logo = null;

    if (req.file) {
      // Convert image to Base64
      logo = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    if (!logoText || !buttonText) {
      return res.status(400).json({ message: "logoText and buttonText are required" });
    }

    const newNavbar = new Navbar({ logo, logoText, buttonText });
    await newNavbar.save();
    
    res.status(201).json({ message: "Navbar item created", data: newNavbar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Navbar Items
export const getAllNavbars = async (req, res) => {
  try {
    const navbars = await Navbar.find();
    res.status(200).json(navbars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Navbar Item by ID
export const getNavbarById = async (req, res) => {
  try {
    const navbar = await Navbar.findById(req.params.id);
    if (!navbar) return res.status(404).json({ message: "Navbar not found" });

    res.status(200).json(navbar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Navbar Item
export const updateNavbar = async (req, res) => {
  try {
    const { logoText, buttonText } = req.body;
    let logo = null;

    if (req.file) {
      // Convert image to Base64
      logo = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const updatedNavbar = await Navbar.findByIdAndUpdate(
      req.params.id,
      { logo, logoText, buttonText },
      { new: true, runValidators: true }
    );

    if (!updatedNavbar) return res.status(404).json({ message: "Navbar not found" });

    res.status(200).json({ message: "Navbar updated", data: updatedNavbar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Navbar Item
export const deleteNavbar = async (req, res) => {
  try {
    const deletedNavbar = await Navbar.findByIdAndDelete(req.params.id);
    if (!deletedNavbar) return res.status(404).json({ message: "Navbar not found" });

    res.status(200).json({ message: "Navbar deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
