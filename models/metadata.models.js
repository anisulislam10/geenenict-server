import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
  metaname: { type: String, required: true },
  metaDescription: { type: String, required: true },
  keywords: { type: [String], required: true },
});

const Metadata = mongoose.model("Metadata", metadataSchema);

export default Metadata;
