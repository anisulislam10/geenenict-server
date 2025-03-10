import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  image: {
     type: String,
      
    },
    link:{
      type: String,
    }
}, { timestamps: true });

export const Client = mongoose.model("Client", clientSchema);
