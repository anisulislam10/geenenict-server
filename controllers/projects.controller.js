import { Project } from "../models/projects.models.js";

// Create a Project
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;

    if (req.file) {
      // Convert image to Base64
      image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newProject = new Project({ title, description, image });
    await newProject.save();
    res.status(201).json({ message: "Project added", data: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;

    if (req.file) {
      // Convert image to Base64
      image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project updated", data: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
