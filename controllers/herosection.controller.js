import { HeroSection } from "../models/herosection.models.js"; 

// Create Hero Section
export const createHeroSection = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body:", req.body);

    const { header, title, subtitle, subsubtitle, description, whoIAm, expertise } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!header || !title || !subtitle || !subsubtitle || !description || !whoIAm || !expertise || !image) {
      return res.status(400).json({
         message: "All fields are required" 
        });
    }

    const newHeroSection = new HeroSection({ header, title, subtitle, subsubtitle, description, whoIAm, expertise, image });
    await newHeroSection.save();
    res.status(201).json({
         message: "Hero Section created",
          data: newHeroSection 
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Hero Sections
export const getAllHeroSections = async (req, res) => {
  try {
    const heroSections = await HeroSection.find();
    res.status(200).json(heroSections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Hero Section by ID
export const getHeroSectionById = async (req, res) => {
  try {
    const heroSection = await HeroSection.findById(req.params.id);
    if (!heroSection) return res.status(404).json({ message: "Hero Section not found" });

    res.status(200).json(heroSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Hero Section
export const updateHeroSection = async (req, res) => {
  try {
    const { header, title, subtitle, subsubtitle, description, whoIAm, expertise, } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      req.params.id,
      { header, title, subtitle, subsubtitle, description, whoIAm, expertise, image },
      { new: true, runValidators: true }
    );

    if (!updatedHeroSection) return res.status(404).json({ message: "Hero Section not found" });

    res.status(200).json({ message: "Hero Section updated", data: updatedHeroSection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Hero Section
export const deleteHeroSection = async (req, res) => {
  try {
    const deletedHeroSection = await HeroSection.findByIdAndDelete(req.params.id);
    if (!deletedHeroSection) return res.status(404).json({ message: "Hero Section not found" });

    res.status(200).json({ message: "Hero Section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
