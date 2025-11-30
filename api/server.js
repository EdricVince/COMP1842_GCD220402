require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const wordRoutes = require('./routes/vocabRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/words', wordRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API live at http://localhost:${PORT}`));