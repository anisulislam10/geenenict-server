import { Service } from "../models/services.models.js";

// Create Service
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Convert image to Base64
    const imageBase64 = req.file.buffer.toString("base64");

    const newService = new Service({ title, description, image: imageBase64 });

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
    const existingService = await Service.findById(req.params.id);

    if (!existingService) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // Convert new image to Base64 if provided
    const image = req.file ? req.file.buffer.toString("base64") : existingService.image;

    existingService.title = title || existingService.title;
    existingService.description = description || existingService.description;
    existingService.image = image;

    await existingService.save();

    res.status(200).json({ success: true, message: "Service updated", data: existingService });
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
