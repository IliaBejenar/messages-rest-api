const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, '..', 'pages')));

// API
const messagesRouter = require('./routes/messages');
app.use('/api/messages', messagesRouter);

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
});

// ONLY THIS FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
