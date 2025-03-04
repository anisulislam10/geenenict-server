import { Service } from "../models/services.models.js";

// Create Service
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !image) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json({ success: true, message: "Service created", data: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Service
export const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const existingService = await Service.findById(req.params.id);
    if (!existingService) return res.status(404).json({ success: false, message: "Service not found" });

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, image: image || existingService.image }, // Retain old image if new one isn't provided
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Service updated", data: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ success: false, message: "Service not found" });

    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
