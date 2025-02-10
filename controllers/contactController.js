// controllers/contactController.js
const db = require('../models/db');

exports.getAllContacts = (req, res) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.createContact = (req, res) => {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: 'Name, email, and phone are required' });
    
    const query = `INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, email, phone, address], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, email, phone, address });
    });
};

exports.getContactById = (req, res) => {
    db.get('SELECT * FROM contacts WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json(row);
    });
};

exports.updateContact = (req, res) => {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: 'Name, email, and phone are required' });
    
    const query = `UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?`;
    db.run(query, [name, email, phone, address, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json({ id: req.params.id, name, email, phone, address });
    });
};

exports.deleteContact = (req, res) => {
    db.run('DELETE FROM contacts WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted successfully' });
    });
};
