// server.js
const express = require('express');
const contactRoutes = require('./routes/contacts');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/contacts', contactRoutes);
app.use(errorHandler);
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



