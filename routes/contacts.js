const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const db = require("../models/db");

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = await db.all(
      `SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ?`,
      [`%${q}%`, `%${q}%`]
    );

    res.json(results);
  } catch (error) {
    console.error("Error searching contacts:", error);
    res.status(500).json({ error: "Failed to search contacts" });
  }
});

module.exports = router;
