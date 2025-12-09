const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables from .env
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON body
app.use(express.json());

// Serve static frontend files from /pages
app.use(express.static(path.join(__dirname, '..', 'pages')));

// API routes (backend)
const messagesRouter = require('./routes/messages');
app.use('/api/messages', messagesRouter);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;

// If port is already in use, switch automatically
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}).on('error', err => {
  if (err.code === 'EADDRINUSE') {
    const newPort = PORT + 1;
    app.listen(newPort, () => {
      console.log(`⚠️ Port ${PORT} was busy, switched to http://localhost:${newPort}`);
    });
  }
});
process.on('SIGINT', () => {
  console.log('Server stopped');
  process.exit();
});
