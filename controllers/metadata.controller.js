import Metadata from "../models/metadata.models.js";

// Create Metadata
export const createMetadata = async (req, res) => {
  try {
    const { metaname, metaDescription, keywords } = req.body;
    
    if (!metaname || !metaDescription || !keywords) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const metadata = new Metadata({ metaname, metaDescription, keywords });
    await metadata.save();

    res.status(201).json({ message: "Metadata created successfully", metadata });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Metadata
export const getAllMetadata = async (req, res) => {
  try {
    const metadataList = await Metadata.find();
    res.status(200).json(metadataList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Metadata
export const getMetadataById = async (req, res) => {
  try {
    const metadata = await Metadata.findById(req.params.id);
    if (!metadata) return res.status(404).json({ message: "Metadata not found" });

    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Metadata
export const updateMetadata = async (req, res) => {
  try {
    const { metaname, metaDescription, keywords } = req.body;
    const updatedMetadata = await Metadata.findByIdAndUpdate(
      req.params.id,
      { metaname, metaDescription, keywords },
      { new: true }
    );

    if (!updatedMetadata) return res.status(404).json({ message: "Metadata not found" });

    res.status(200).json({ message: "Metadata updated successfully", updatedMetadata });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Metadata
export const deleteMetadata = async (req, res) => {
  try {
    const deletedMetadata = await Metadata.findByIdAndDelete(req.params.id);
    if (!deletedMetadata) return res.status(404).json({ message: "Metadata not found" });

    res.status(200).json({ message: "Metadata deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
