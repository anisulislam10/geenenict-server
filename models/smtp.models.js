import mongoose from "mongoose";

const smtpSchema = new mongoose.Schema({
  email: String,
  password: String,
  host: String,
  port: Number,
  ownerEmail: String,
});

const SMTP = mongoose.model("SMTP", smtpSchema);

export default SMTP; // Now it's a default export
