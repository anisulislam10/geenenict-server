import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export const ContactUS = mongoose.model("ContactM", contactSchema);
