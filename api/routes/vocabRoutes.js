const express = require('express');
const router = express.Router();
const vocab = require('../controllers/vocabController');

// GET all words
router.get('/', vocab.fetchAll);

// POST a new word
router.post('/', vocab.addNew);

// GET one word by ID
router.get('/:id', vocab.fetchById);

// PUT (update) word by ID
router.put('/:id', vocab.modify);

// DELETE word by ID
router.delete('/:id', vocab.remove);

module.exports = router;
