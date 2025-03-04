import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({
  logo: { type: String, require:false },
  logoText: { type: String,  }, 
  buttonText: { type: String,  } 
});

export const Navbar = mongoose.model("Navbar", navbarSchema);
