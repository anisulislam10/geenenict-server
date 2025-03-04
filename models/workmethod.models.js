import mongoose from "mongoose";

const workMethodSchema = new mongoose.Schema({
  header: { type: String,  },
  title: { type: String,  },
  description: { type: String,  }
}, { timestamps: true });

export const WorkMethod = mongoose.model("WorkMethod", workMethodSchema);
