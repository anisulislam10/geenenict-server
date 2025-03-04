import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  subtitle: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  linkedin: { type: String, required: true },
  kvk: { type: String, required: true },
  btw: { type: String, required: true },
  copyright: { type: String, required: true },
  companyName: { type: String, required: true },
  companyLink: { type: String, required: true },
});

const Footer = mongoose.model("Footer", footerSchema);
export default Footer;
