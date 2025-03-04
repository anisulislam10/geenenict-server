import { RecentProject } from "../models/recentprojects.models.js";

// Create a Recent Project
export const createRecentProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title ) {
      return res.status(400).json({ message: "Title required" });
    }

    const newProject = new RecentProject({ title, description });
    await newProject.save();
    res.status(201).json({ message: "Recent project title added", data: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Recent Projects
export const getAllRecentProjects = async (req, res) => {
  try {
    const projects = await RecentProject.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Recent Project by ID
export const getRecentProjectById = async (req, res) => {
  try {
    const project = await RecentProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Recent Project
export const updateRecentProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedProject = await RecentProject.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Recent project updated", data: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Recent Project
export const deleteRecentProject = async (req, res) => {
  try {
    const deletedProject = await RecentProject.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Recent project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
