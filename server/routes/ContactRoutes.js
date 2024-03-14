const express = require("express");
const router = express.Router();
const contactController = require("../controllers/ContactController");

router.post("/contacts/fetch", contactController.getAllContacts);

router.post("/contacts", contactController.createContact);

router.post("/contacts/delete", contactController.deleteContact);

router.post("/contacts/update", contactController.updateContact);

module.exports = router;
