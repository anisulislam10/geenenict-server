import { Client } from "../models/clients.models.js";

// Create Client (Add Base64 Image and Link)
export const createClient = async (req, res) => {
  try {
    const { image, link } = req.body; // Expecting a Base64 image string and link in the request body

    // Create a new client with the Base64 image and link
    const newClient = new Client({ image, link });
    await newClient.save();

    res.status(201).json({ message: "Certificate added", data: newClient });
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
    if (!client) return res.status(404).json({ message: "Certificate not found" });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Client Image and Link
export const updateClient = async (req, res) => {
  try {
    const { image, link } = req.body; // Expecting a Base64 image string and link in the request body

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { image, link },
      { new: true, runValidators: true }
    );

    if (!updatedClient) return res.status(404).json({ message: "Certificate not found" });

    res.status(200).json({ message: "Certificate updated", data: updatedClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
