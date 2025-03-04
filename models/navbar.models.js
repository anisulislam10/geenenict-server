import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  logoText: { type: String, required: true }, 
  buttonText: { type: String, required: true } 
});

export const Navbar = mongoose.model("Navbar", navbarSchema);
