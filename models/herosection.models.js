import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema({
  header: { 
    type: String, 
  },
  title: { 
    type: String, 
  },
  subtitle: { 
    type: String, 
  },
  subsubtitle: { 
    type: String, 
  },
  description: { 
    type: String, 
  },
  whoIAm: { 
    type: String, 
  },
  expertise: { 
    type: String, 
  },
  image: { 
    type: String, 
  }
}, { timestamps: true });

export const HeroSection = mongoose.model("HeroSection", heroSectionSchema);
