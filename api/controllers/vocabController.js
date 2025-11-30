const Word = require('../models/vocabModel');
const mongoose = require('mongoose');

exports.fetchAll = async (req, res) => {
  try {
    const list = await Word.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const found = await Word.findById(req.params.id);
    if (!found) return res.status(404).json({ error: 'Not found' });
    res.json(found);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addNew = async (req, res) => {
  const { vietnamese, italian, english } = req.body;
  if (!vietnamese?.trim() || !italian?.trim() || !english?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newEntry = new Word({ vietnamese: vietnamese.trim(), italian: italian.trim(), english: english.trim() });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.modify = async (req, res) => {
  console.log('Update request body:', req.body); // Log để check data nhận từ frontend
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  const { vietnamese, italian, english } = req.body; // Trim nếu cần
  const updateData = {};
  if (vietnamese) updateData.vietnamese = vietnamese.trim();
  if (italian) updateData.italian = italian.trim();
  if (english) updateData.english = english.trim();
  if (Object.keys(updateData).length === 0) return res.status(400).json({ error: 'No fields to update' });
  try {
    const updated = await Word.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const result = await Word.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};