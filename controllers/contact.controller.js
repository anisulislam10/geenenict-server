import  {ContactUS}  from "../models/contact.model.js";
import transporter from "../config/emailConfig.js";

import nodemailer from "nodemailer";



// Create Contact Message
// Send Message and Save to DB
export const sendMessage = async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;
  
      if (!firstName || !email || !message) {
        return res.status(400).json({ message: "First name, email, and message are required." });
      }
  
      // Save to DB
      const newContact = new ContactUS({ firstName, lastName, email, message });
      await newContact.save();
  
      // Send Email
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.OWNER_EMAIL, // The admin/owner email
        subject: "New Contact Form Submission",
        html: `
          <h3>New Message from Contact Form</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Get All Contact Messages
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUS.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Contact Message by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await ContactUS.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact message not found" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Contact Message
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await ContactUS.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact message not found" });

    res.status(200).json({ message: "Contact message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
