const express = require('express');
const connectDB = require('./config/db');
const comicRoutes = require('./routes/comicRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use('/api', comicRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
