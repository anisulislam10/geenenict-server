import { Service } from "../models/services.models.js";
import { cloudinary } from "../config/cloudinaryConfig.js"; // Import Cloudinary

// Create Service
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Upload image to Cloudinary
    let imageUrl = null;
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "services_uploads",
      });
      imageUrl = uploadedImage.secure_url;
    }

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newService = new Service({ title, description, image: imageUrl });
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

    let imageUrl = existingService.image;
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "services_uploads",
      });
      imageUrl = uploadedImage.secure_url;
    }

    existingService.title = title || existingService.title;
    existingService.description = description || existingService.description;
    existingService.image = imageUrl;

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
