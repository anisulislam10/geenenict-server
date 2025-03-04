import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  image: {
     type: String,
      required: true 
    } 
}, { timestamps: true });

export const Client = mongoose.model("Client", clientSchema);
