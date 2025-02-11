const express = require('express');
const cors = require("cors");
const contactRoutes = require('./routes/contacts');
const { errorHandler } = require('./middlewares/errorHandler');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Database setup (initialize before starting the server)
const db = new Database('contacts.db', { verbose: console.log });

// Routes
app.use('/contacts', contactRoutes);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
