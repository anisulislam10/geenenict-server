import { Contact } from "../models/contactsection.models.js";

// Create Contact Section
export const createContact = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !image) {
      return res.status(400).json({ message: "Title and Image are required" });
    }

    const newContact = new Contact({ title, image });
    await newContact.save();

    res.status(201).json({ message: "Contact section created", data: newContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Contact Sections
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Contact Section by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact section not found" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Contact Section
export const updateContact = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { title, image },
      { new: true, runValidators: true }
    );

    if (!updatedContact) return res.status(404).json({ message: "Contact section not found" });

    res.status(200).json({ message: "Contact section updated", data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Contact Section
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact section not found" });

    res.status(200).json({ message: "Contact section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
