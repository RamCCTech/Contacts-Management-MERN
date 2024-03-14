const Contact = require("../models/ContactModel");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.body.user }); // Fetch contacts associated with the current user
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body); // Include user ID in the contact data
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: req.body.params.id,
      user: req.body.params.user,
    }); // Delete contact associated with the current user
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(deletedContact);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contactid = req.body.params.cid;
    const { name, email, phone, image } = req.body.params.contact;

    // Find the contact by ID
    let contact = await Contact.findById(contactid);

    // Check if the contact exists
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Update contact fields
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    if (image) contact.image = image;

    // Save the updated contact
    contact = await contact.save();

    res.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};
