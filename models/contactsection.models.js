import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);
