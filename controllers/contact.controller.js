import  {ContactUS}  from "../models/contact.model.js";
import transporter from "../config/emailConfig.js";
import SMTPConfig from '../models/smtp.models.js'
import nodemailer from "nodemailer";



// Create Contact Message
// Send Message and Save to DB
export const sendMessage = async (req, res) => {
  try {
      const { firstName, lastName, email, message } = req.body;

      if (!firstName || !email || !message) {
          return res.status(400).json({ message: "First name, email, and message are required." });
      }

      // Fetch SMTP settings from the database
      const smtpSettings = await SMTPConfig.findOne();
      if (!smtpSettings) {
          return res.status(500).json({ message: "SMTP settings not configured." });
      }

      // Configure dynamic transporter
      const transporter = nodemailer.createTransport({
          host: smtpSettings.host,
          port: smtpSettings.port,
          secure: smtpSettings.port === 465, // True for 465, false for others
          auth: {
              user: smtpSettings.email,
              pass: smtpSettings.password,
          },
      });

      // Save message to database
      const newContact = new ContactUS({ firstName, lastName, email, message });
      await newContact.save();

      // Send Email
      const mailOptions = {
          from: smtpSettings.email,
          to: smtpSettings.ownerEmail,
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
