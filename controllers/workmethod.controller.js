import { WorkMethod } from "../models/workmethod.models.js";

// Create WorkMethod
export const createWorkMethod = async (req, res) => {
  try {
    const { header, title, description } = req.body;

    if (!header || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newWorkMethod = new WorkMethod({ header, title, description });
    await newWorkMethod.save();

    res.status(201).json({ message: "WorkMethod created successfully", data: newWorkMethod });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All WorkMethods
export const getWorkMethod = async (req, res) => {
  try {
    const workMethods = await WorkMethod.find();
    res.status(200).json(workMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single WorkMethod by ID
export const getWorkMethodById = async (req, res) => {
  try {
    const { id } = req.params;
    const workMethod = await WorkMethod.findById(id);

    if (!workMethod) return res.status(404).json({ message: "WorkMethod not found" });

    res.status(200).json(workMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update WorkMethod by ID
export const updateWorkMethod = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL
    const { header, title, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "WorkMethod ID is required" });
    }

    const updatedWorkMethod = await WorkMethod.findByIdAndUpdate(
      id,  // Update using ID
      { header, title, description },
      { new: true }
    );

    if (!updatedWorkMethod) {
      return res.status(404).json({ message: "WorkMethod not found" });
    }

    res.status(200).json({ message: "WorkMethod updated", data: updatedWorkMethod });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete WorkMethod by ID
export const deleteWorkMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWorkMethod = await WorkMethod.findByIdAndDelete(id);

    if (!deletedWorkMethod) {
      return res.status(404).json({ message: "WorkMethod not found" });
    }

    res.status(200).json({ message: "WorkMethod deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
