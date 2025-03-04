import Footer from "../models/footer.models.js";

// Create Footer (Only needed once, since there's only one footer)
export const createFooter = async (req, res) => {
  try {
    const existingFooter = await Footer.findOne();
    if (existingFooter) {
      return res.status(400).json({ message: "Footer already exists. Use update instead." });
    }

    const footer = new Footer(req.body);
    await footer.save();
    res.status(201).json({ message: "Footer created successfully", data: footer });
  } catch (error) {
    res.status(500).json({ message: "Error creating footer", error: error.message });
  }
};

// Get Footer (Always returns one)
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: "Footer not found" });

    res.status(200).json({ message: "Footer retrieved successfully", data: footer });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving footer", error: error.message });
  }
};

// Update Footer (Upsert: creates if missing)
export const updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndUpdate({}, req.body, { new: true, upsert: true });

    res.status(200).json({ message: "Footer updated successfully", data: footer });
  } catch (error) {
    res.status(500).json({ message: "Error updating footer", error: error.message });
  }
};

// Delete Footer (Removes the only one)
export const deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndDelete();
    if (!footer) return res.status(404).json({ message: "Footer not found" });

    res.status(200).json({ message: "Footer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting footer", error: error.message });
  }
};
