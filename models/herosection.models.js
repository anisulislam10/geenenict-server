import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema({
  header: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  subtitle: { 
    type: String, 
    required: true 
  },
  subsubtitle: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  whoIAm: { 
    type: String, 
    required: true 
  },
  expertise: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

export const HeroSection = mongoose.model("HeroSection", heroSectionSchema);
