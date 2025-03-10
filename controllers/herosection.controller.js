import { HeroSection } from "../models/herosection.models.js"; 

// Create Hero Section
export const createHeroSection = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body:", req.body);

    const { header, title, subtitle, subsubtitle, description, whoIAm, expertise } = req.body;
    
    // if (!header || !title || !subtitle || !subsubtitle || !description || !whoIAm || !expertise || !req.file) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // Convert image to Base64
    const imageBase64 = req.file.buffer.toString("base64");

    const newHeroSection = new HeroSection({ 
      header, title, subtitle, subsubtitle, description, whoIAm, expertise, image: imageBase64 
    });

    await newHeroSection.save();
    res.status(201).json({ message: "Hero Section created", data: newHeroSection });

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
    const { header, title, subtitle, subsubtitle, description, whoIAm, expertise } = req.body;
    
    const existingHeroSection = await HeroSection.findById(req.params.id);
    if (!existingHeroSection) {
      return res.status(404).json({ message: "Hero Section not found" });
    }

    // Convert new image to Base64 if provided
    const image = req.file ? req.file.buffer.toString("base64") : existingHeroSection.image;

    existingHeroSection.header = header || existingHeroSection.header;
    existingHeroSection.title = title || existingHeroSection.title;
    existingHeroSection.subtitle = subtitle || existingHeroSection.subtitle;
    existingHeroSection.subsubtitle = subsubtitle || existingHeroSection.subsubtitle;
    existingHeroSection.description = description || existingHeroSection.description;
    existingHeroSection.whoIAm = whoIAm || existingHeroSection.whoIAm;
    existingHeroSection.expertise = expertise || existingHeroSection.expertise;
    existingHeroSection.image = image;

    await existingHeroSection.save();

    res.status(200).json({ message: "Hero Section updated", data: existingHeroSection });

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
