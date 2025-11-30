const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  vietnamese: {
    type: String,
    required: [true, 'Vietnamese word is required'],
    index: true
  },
  italian: {
    type: String,
    required: [true, 'Italian word is required'],
    index: true
  },
  english: {
    type: String,
    required: [true, 'English word is required'],
    index: true
  }
}, {
  collection: 'vocab',
  timestamps: true
});

module.exports = mongoose.model('Word', WordSchema);