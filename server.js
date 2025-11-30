const express = require('express');
const mongoose = require('mongoose');
const wordRoutes = require('./routes/vocabRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/comp1842', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('Mongo error:', err.message));

app.use(express.json());
app.use('/words', wordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API live at http://localhost:${PORT}`));
