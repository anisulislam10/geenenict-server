import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, require:false },

}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema);
