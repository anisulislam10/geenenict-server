import mongoose from "mongoose";

const recentProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, }
}, { timestamps: true });

export const RecentProject = mongoose.model("RecentProjectsection", recentProjectSchema);
