import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);
