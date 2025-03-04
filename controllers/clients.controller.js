import {Client}  from "../models/clients.models.js";

// Create Client (Add Image)
export const createClient = async (req, res) => {
  try {
    console.log("File received:", req.file);

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newClient = new Client({ image });
    await newClient.save();
    res.status(201).json({ message: "Client added", data: newClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Client by ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Client Image
export const updateClient = async (req, res) => {
  try {
    let image = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { image },
      { new: true, runValidators: true }
    );

    if (!updatedClient) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Client image updated", data: updatedClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
