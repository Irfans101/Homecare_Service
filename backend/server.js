const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logger to help debug frontend requests
app.use((req, res, next) => {
  try {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl} origin=${req.headers.origin || 'none'}`);
    if (req.method === 'POST' || req.method === 'PATCH') {
      console.log('  Body:', JSON.stringify(req.body));
    }
  } catch (err) {
    // ignore logging errors
  }
  next();
});

// Health check endpoint (used by Koyeb to verify the app is running)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
const bookingsRouter = require('./routes/bookings');
app.use('/api/bookings', bookingsRouter);
// Contact form submissions (single endpoint for all contact forms)
const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);
// Quick request (hero / quick booking) endpoint
const requestRouter = require('./routes/request');
app.use('/api/request-service', requestRouter);

// Start the HTTP server immediately so frontend can reach it during dev.
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

// Attempt MongoDB connection but do not prevent the server from starting.
// Connect to MongoDB (non-blocking for dev).
let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/homecare';
// sanitize: trim and remove UTF-8 BOM if present
if (typeof mongoUri === 'string') {
  mongoUri = mongoUri.trim().replace(/^\uFEFF/, '');
}
// validate scheme before attempting connection
if (!/^mongodb(\+srv)?:\/\//i.test(mongoUri)) {
  console.error('MongoDB connection error: invalid URI scheme. Skipping connection.');
} else {
  mongoose.connect(mongoUri)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(err => {
      console.error('MongoDB connection error (server is still running):', err.message || err);
    });
}