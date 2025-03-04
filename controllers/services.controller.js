import { Service } from "../models/services.models.js";

// Create Service
export const createService = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body:", req.body);

    const {title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json({ message: "Service created", data: newService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Service
export const updateService = async (req, res) => {
  try {
    const {title, description } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {title, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedService) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service updated", data: updatedService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
